"use client";

import { ResumeResponse } from "@/types/types";
import ExperienceSection from "@/components/resumes/ExperienceSection";
import EducationSection from "@/components/resumes/EducationSection";
import TechStackSection from "@/components/resumes/TechStackSection";

interface ResumeDetailProps {
  resume: ResumeResponse;
}

export default function ResumeDetail({ resume }: ResumeDetailProps) {
  return (
    <div className="w-full space-y-8">
      {resume.fileName && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-2">File</h2>
          <p className="text-gray-300">{resume.fileName}</p>
        </div>
      )}

      <ExperienceSection experience={resume.experience || []} />
      <EducationSection education={resume.education || []} />
      <TechStackSection techStack={resume.techStack || []} />

      {!resume.experience?.length &&
        !resume.education?.length &&
        !resume.techStack?.length && (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">No structured data was extracted from this resume.</p>
          </div>
        )}

      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-gray-400 text-sm">
          Created: {new Date(resume.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
