import axios from "axios";

type Config = {
  headers?: Record<string, string>;
  [key: string]: unknown;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  withCredentials: true,
  timeout: 20000,
  validateStatus: (status) => status >= 200 && status < 500,
});

api.interceptors.request.use(
  (config) => {
    const isFormData = config.data instanceof FormData;
    if (!isFormData && !config.headers?.["Content-Type"]) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";
    }
    if (isFormData && config.headers?.["Content-Type"]) {
      delete config.headers["Content-Type"];
    }

    if (isFormData) {
      config.timeout = 90000;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      window.location.href = "/sign-in";
    }
    throw error;
  }
);

const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  shouldRetryFn?: (error: unknown) => boolean
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    const err = error as {
      code?: string;
      message?: string;
      response?: { status?: number };
    };

    const shouldRetry = shouldRetryFn
      ? shouldRetryFn(error)
      : retries > 0 &&
        (err?.code === "ECONNREFUSED" ||
          err?.code === "ECONNABORTED" ||
          err?.message?.includes("timeout") ||
          err?.response?.status === 500 ||
          err?.message === "Network Error");

    if (shouldRetry && retries > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, delay * 2 + Math.random() * 100)
      );
      return retryRequest(requestFn, retries - 1, delay * 2, shouldRetryFn);
    }

    throw error;
  }
};

export const nestApi = {
  get: async <T>(url: string, config: Config = {}): Promise<T> => {
    return retryRequest(async () => {
      const response = await api.get(url, config);
      return response.data as T;
    });
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config: Config = {}
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    const shouldRetryFn = isFormData
      ? (error: unknown) => {
          const err = error as {
            code?: string;
            message?: string;
            response?: { status?: number };
          };
          return (
            err?.code === "ECONNREFUSED" ||
            err?.code === "ECONNABORTED" ||
            err?.response?.status === 500 ||
            err?.message === "Network Error"
          );
        }
      : undefined;

    return retryRequest(
      async () => {
        const response = await api.post(url, data, config);
        return response.data as T;
      },
      3,
      1000,
      shouldRetryFn
    );
  },

  delete: async <T>(url: string, config: Config = {}): Promise<T> => {
    return retryRequest(async () => {
      const response = await api.delete(url, config);
      return response.data as T;
    });
  },
};
