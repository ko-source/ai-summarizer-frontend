"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSummariesStore } from "@/store/useSummaryStore";
import SummaryCard from "@/components/Summaries/summaryCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import ErrorMessage from "@/components/errorMessage";

export default function SummariesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthGuard();
  const { summaries, error, loadSummaries } = useSummariesStore();

  useEffect(() => {
    if (isAuthenticated) {
      loadSummaries();
    }
  }, [isAuthenticated, loadSummaries]);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-white mb-6">All Summaries</h1>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white mb-6">All Summaries</h1>

        {summaries.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No summaries yet.</p>
            <p className="text-gray-500 mt-2">
              Create your first summary on the{" "}
              <button
                onClick={() => router.push("/")}
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                dashboard
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {summaries.map((summary) => (
              <SummaryCard
                key={summary.id}
                summary={summary}
                onClick={() => router.push(`/summaries/${summary.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
