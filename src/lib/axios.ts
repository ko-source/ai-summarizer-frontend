import axios from "axios";

type Config = {
  headers?: Record<string, string>;
  [key: string]: unknown;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 20000,
  validateStatus: (status) => status >= 200 && status < 500,
});

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
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    const err = error as {
      code?: string;
      message?: string;
      response?: { status?: number };
    };

    const shouldRetry =
      retries > 0 &&
      (err?.code === "ECONNREFUSED" ||
        err?.code === "ECONNABORTED" ||
        err?.message?.includes("timeout") ||
        err?.response?.status === 500 ||
        err?.message === "Network Error");

    if (shouldRetry) {
      await new Promise((resolve) =>
        setTimeout(resolve, delay * 2 + Math.random() * 100)
      );
      return retryRequest(requestFn, retries - 1, delay * 2);
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
    return retryRequest(async () => {
      const response = await api.post(url, data, config);
      return response.data as T;
    });
  },

  delete: async <T>(url: string, config: Config = {}): Promise<T> => {
    return retryRequest(async () => {
      const response = await api.delete(url, config);
      return response.data as T;
    });
  },
};
