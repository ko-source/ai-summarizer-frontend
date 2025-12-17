"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSummariesStore } from "@/store/summaryStore";
import SummaryDetail from "@/components/Summaries/summaryDetail";
import ErrorMessage from "@/components/errorMessage";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SummaryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { currentSummary, error, loadSummaryById } = useSummariesStore();

  const summaryId = params?.id ? Number(params.id) : null;

  useEffect(() => {
    if (summaryId) {
      loadSummaryById(summaryId);
    }
  }, [summaryId, loadSummaryById]);

  if (!summaryId || isNaN(summaryId)) {
    return (
      <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-400">Invalid summary ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full">
        <button
          onClick={() => router.back()}
          className="text-indigo-400 hover:text-indigo-300 mb-6 flex items-center gap-2 cursor-pointer"
        >
          <span><ArrowLeftIcon className="w-4 h-4" /></span> Back
        </button>

        {error ? (
          <ErrorMessage message={error} />
        ) : currentSummary ? (
          <SummaryDetail summary={currentSummary} />
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">Summary not found</p>
          </div>
        )}
      </div>
    </div>
  );
}
