import { SummaryResponse } from "@/types/types";

interface SummaryCardProps {
  summary: SummaryResponse;
  onClick: () => void;
}

export default function SummaryCard({ summary, onClick }: SummaryCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">
          Summary # {summary.id}
        </h3>
        <p className="text-gray-500 text-sm">
          {new Date(summary.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {summary.summary}
      </p>
      <div className="flex gap-4 text-xs text-gray-500">
        {summary.actionItems && summary.actionItems.length > 0 && (
          <span>{summary.actionItems.length} action items</span>
        )}
        {summary.risks && summary.risks.length > 0 && (
          <span>{summary.risks.length} risks</span>
        )}
        {summary.nextSteps && summary.nextSteps.length > 0 && (
          <span>{summary.nextSteps.length} next steps</span>
        )}
      </div>
    </div>
  );
}
