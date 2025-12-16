import axios from "axios";


type Config = {
  headers?: Record<string, string>;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  [key: string]: unknown;
};

const handleAxiosError = (error: unknown) => {
  const err = error as {
    code?: string;
    message?: string;
    response?: { data?: { message?: string } };
    isAxiosError?: boolean;
  };

  if (err?.code === "ECONNABORTED" || err?.message?.includes("timeout")) {
    throw new Error(
      "Request timed out. Please try again or check your internet connection."
    );
  }

  if (err?.code === "ECONNREFUSED") {
    throw new Error(
      "Unable to connect to the server. Please check if the server is running."
    );
  }

  if (err?.message === "Network Error") {
    throw new Error("Network error. Please check your internet connection.");
  }

  if (err?.response?.data) {
    const message = err.response.data.message || "An error occurred";
    throw new Error(message);
  }

  throw error;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 20000,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      window.location.href = "/sign-in";
      return Promise.reject(error);
    }

    return Promise.reject(handleAxiosError(error));
  }
);

const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error: unknown) {
    const err = error as {
      code?: string;
      message?: string;
      response?: { status?: number; data?: { message?: string } };
    };

    const shouldRetry =
      retries > 0 &&
      (err?.code === "ECONNREFUSED" ||
        err?.code === "ECONNABORTED" ||
        err?.message?.includes("timeout") ||
        err?.response?.status === 500 ||
        err?.message === "Network Error");

    if (shouldRetry) {
      const jitter = Math.random() * 100;
      const backoffDelay = delay * 2 + jitter;
      await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      return retryRequest(requestFn, retries - 1, backoffDelay);
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
