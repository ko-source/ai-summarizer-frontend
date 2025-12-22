"use client";

import { create } from "zustand";
import { useAuthStore } from "./authStore";
import type { ResumeResponse } from "@/types/types";
import { nestApi } from "@/lib/axios";

type ResumeState = {
  resume: ResumeResponse | null;
  isLoading: boolean;
  error: string | null;
  extractResume: (file: File) => Promise<void>;
  clearResume: () => void;
};

const getAuthToken = (): string | null => useAuthStore.getState().token;

export const useResumeStore = create<ResumeState>((set) => ({
  resume: null,
  isLoading: false,
  error: null,

  extractResume: async (file: File) => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await nestApi.post<ResumeResponse>("/resumes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ resume: response, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to extract resume",
      });
      throw err;
    }
  },

  clearResume: () => set({ resume: null, error: null }),
}));
