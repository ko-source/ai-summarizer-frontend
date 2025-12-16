"use client";

import { create } from "zustand";
import { nestApi } from "@/lib/axios";
import { useAuthStore } from "./useAuthStore";
import type { SummaryResponse } from "@/types/types";

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
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Not authenticated" });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const data = await nestApi.get<SummaryResponse[]>("/summaries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ summaries: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load summaries",
      });
    }
  },

  loadSummaryById: async (id: number) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Not authenticated" });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const data = await nestApi.get<SummaryResponse>(`/summaries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ currentSummary: data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message || "Failed to load summary",
      });
    }
  },

  summarizeText: async (text: string) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Not authenticated" });
      return;
    }

    try {
      set({ isLoading: true, error: null });
      const result = await nestApi.post<SummaryResponse>(
        "/summaries",
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const prev = get().summaries;
      set({
        currentSummary: result,
        summaries: [result, ...prev],
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
