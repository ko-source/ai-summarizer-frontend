"use client";

import type { ExperienceItem } from "@/types/types";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export default function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">Experience</h2>
      <div className="space-y-3">
        {experience.map((item, index) => (
          <div
            key={`${item.company ?? "exp"}-${index}`}
            className="border border-gray-700 rounded-md p-4 bg-gray-900/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white">
                  {item.title ?? "Role"}
                </p>
                <p className="text-sm text-gray-300">
                  {item.company ?? "Company"}
                </p>
              </div>
              {(item.startDate || item.endDate) && (
                <p className="text-xs text-gray-400">
                  {item.startDate ?? "Start"} - {item.endDate ?? "Present"}
                </p>
              )}
            </div>
            {item.location && (
              <p className="text-xs text-gray-400 mt-1">{item.location}</p>
            )}
            {item.description && (
              <p className="text-sm text-gray-200 mt-2 whitespace-pre-line">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
