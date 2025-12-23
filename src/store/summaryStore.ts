"use client";

import { create } from "zustand";
import { nestApi } from "@/lib/axios";
import type { SummaryResponse } from "@/types/types";
import { createAuthHeaders, getAuthToken } from "@/lib/auth-helpers";

type SummariesState = {
  summaries: SummaryResponse[];
  currentSummary: SummaryResponse | null;
  isLoading: boolean;
  error: string | null;

  loadSummaries: () => Promise<void>;
  loadSummaryById: (id: number) => Promise<void>;
  summarizeText: (text: string) => Promise<void>;
  clearCurrentSummary: () => void;
};

export const useSummariesStore = create<SummariesState>((set, get) => ({
  summaries: [],
  currentSummary: null,
  isLoading: false,
  error: null,

  loadSummaries: async () => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const data = await nestApi.get<SummaryResponse[]>(
        "/summaries",
        createAuthHeaders(token)
      );
      set({ summaries: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load summaries",
      });
    }
  },

  loadSummaryById: async (id: number) => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const data = await nestApi.get<SummaryResponse>(
        `/summaries/${id}`,
        createAuthHeaders(token)
      );
      set({ currentSummary: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load summary",
      });
    }
  },

  summarizeText: async (text: string) => {
    const token = getAuthToken();
    if (!token) return set({ error: "Not authenticated" });

    set({ isLoading: true, error: null });
    try {
      const result = await nestApi.post<SummaryResponse>(
        "/summaries",
        { text },
        createAuthHeaders(token)
      );

      set({
        currentSummary: result,
        summaries: [result, ...get().summaries],
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to generate summary",
      });
    }
  },

  clearCurrentSummary: () => set({ currentSummary: null }),
}));
