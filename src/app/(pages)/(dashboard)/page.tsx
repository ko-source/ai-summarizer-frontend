"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import toast from "react-hot-toast";
import { useSummariesStore } from "@/store/summaryStore";
import SummaryDetail from "@/components/Summaries/summaryDetail";
import SummaryCard from "@/components/Summaries/summaryCard";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("");

  const {
    summaries,
    currentSummary,
    isLoading,
    loadSummaries,
    summarizeText,
  } = useSummariesStore();

  useEffect(() => {
    loadSummaries();
  }, [loadSummaries]);

  const handleSummarize = async () => {
    if (!text.trim() || text.trim().length < 10) {
      toast.error("Please enter at least 10 characters");
      return;
    }

    await summarizeText(text);
    const currentError = useSummariesStore.getState().error;
    if (currentError) {
      toast.error(currentError);
    } else {
      toast.success("Summary generated successfully!");
      setText("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full flex flex-col items-start justify-start space-y-6">
        <div className="w-full">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Paste your notes here
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[40vh] border-2 border-gray-600 rounded-md p-4 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Paste meeting notes, interview notes, or any text you want to summarize..."
            disabled={isLoading}
          />
        </div>

        <Button
          type="button"
          onClick={handleSummarize}
          label={isLoading ? "Summarizing..." : "Summarize"}
          className="max-w-[300px] w-full"
          disabled={isLoading}
        />

        {currentSummary && (
          <div className="w-full mt-8">
            <SummaryDetail summary={currentSummary} />
          </div>
        )}

        {summaries.length > 0 && (
          <div className="w-full mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Previous Summaries
              </h3>
              {summaries.length > 3 && (
                <button
                  onClick={() => router.push("/summaries")}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium cursor-pointer"
                >
                  View All ({summaries.length})
                </button>
              )}
            </div>
            <div className="space-y-4">
              {summaries.slice(0, 3).map((summary) => (
                <SummaryCard
                  key={summary.id}
                  summary={summary}
                  onClick={() => router.push(`/summaries/${summary.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
