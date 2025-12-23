"use client";

import { create } from "zustand";
import type { ResumeResponse } from "@/types/types";
import { nestApi } from "@/lib/axios";
import { createAuthHeaders, getAuthToken } from "@/lib/auth-helpers";

type ResumeState = {
  resumes: ResumeResponse[];
  currentResume: ResumeResponse | null;
  isLoading: boolean;
  error: string | null;
  extractResume: (file: File) => Promise<void>;
  loadResumes: () => Promise<void>;
  loadResumeById: (id: number) => Promise<void>;
  clearResume: () => void;
};

export const useResumeStore = create<ResumeState>((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  extractResume: async (file: File) => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await nestApi.post<ResumeResponse>(
        "/resumes",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        currentResume: response,
        resumes: [response, ...get().resumes],
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to extract resume",
      });
      throw err;
    }
  },

  loadResumes: async () => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const data = await nestApi.get<ResumeResponse[]>(
        "/resumes",
        createAuthHeaders(token)
      );
      set({ resumes: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load resumes",
      });
    }
  },

  loadResumeById: async (id: number) => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const data = await nestApi.get<ResumeResponse>(
        `/resumes/${id}`,
        createAuthHeaders(token)
      );
      set({ currentResume: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load resume",
      });
    }
  },

  clearResume: () => set({ currentResume: null, error: null }),
}));
