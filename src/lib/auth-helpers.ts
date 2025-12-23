import { useAuthStore } from "@/store/authStore";

export const getAuthToken = (): string | null => useAuthStore.getState().token;

export const createAuthHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});
