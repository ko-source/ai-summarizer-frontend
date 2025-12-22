"use client";

import type { EducationItem } from "@/types/types";

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">Education</h2>
      <div className="space-y-3">
        {education.map((item, index) => (
          <div
            key={`${item.institution ?? "edu"}-${index}`}
            className="border border-gray-700 rounded-md p-4 bg-gray-900/40"
          >
            <p className="text-sm font-semibold text-white">
              {item.institution ?? "Institution"}
            </p>
            <p className="text-sm text-gray-300">
              {item.studyType ?? ""} {item.area ? `· ${item.area}` : ""}
            </p>
            {(item.startDate || item.endDate) && (
              <p className="text-xs text-gray-400 mt-1">
                {item.startDate ?? "Start"} - {item.endDate ?? "Present"}
              </p>
            )}
            {item.score && (
              <p className="text-xs text-gray-400 mt-1">Score: {item.score}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
