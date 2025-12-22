"use client";

interface TechStackSectionProps {
  techStack: string[];
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
