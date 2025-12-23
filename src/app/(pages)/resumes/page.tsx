"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";
import ResumeCard from "@/components/resumes/resumeCard";
import ErrorMessage from "@/components/errorMessage";

export default function ResumesPage() {
  const router = useRouter();
  const { resumes, error, loadResumes } = useResumeStore();

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-white mb-6">All Resumes</h1>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white mb-6">All Resumes</h1>

        {resumes.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No resumes yet.</p>
            <p className="text-gray-500 mt-2">
              Upload your first resume in the{" "}
              <button
                onClick={() => router.push("/resume-extractor")}
                className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                resume extractor
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onClick={() => router.push(`/resumes/${resume.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
