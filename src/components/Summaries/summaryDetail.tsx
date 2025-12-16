import { SummaryResponse } from "@/types/types";

interface SummaryDetailProps {
  summary: SummaryResponse;
}

export default function SummaryDetail({ summary }: SummaryDetailProps) {
  return (
    <div className="w-full space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{summary.summary}</p>
      </div>

      {summary.actionItems && summary.actionItems.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Action Items</h3>
          <ul className="list-disc list-inside space-y-2">
            {summary.actionItems.map((item, index) => (
              <li key={index} className="text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.risks && summary.risks.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Risks / Concerns</h3>
          <ul className="list-disc list-inside space-y-2">
            {summary.risks.map((risk, index) => (
              <li key={index} className="text-gray-300">
                {risk}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.nextSteps && summary.nextSteps.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Next Steps</h3>
          <ul className="list-disc list-inside space-y-2">
            {summary.nextSteps.map((step, index) => (
              <li key={index} className="text-gray-300">
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">
          Created: {new Date(summary.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
