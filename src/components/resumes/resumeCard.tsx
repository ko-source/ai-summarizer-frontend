import { ResumeResponse } from "@/types/types";

interface ResumeCardProps {
  resume: ResumeResponse;
  onClick: () => void;
}

export default function ResumeCard({ resume, onClick }: ResumeCardProps) {
  const experienceCount = resume.experience?.length || 0;
  const educationCount = resume.education?.length || 0;
  const techStackCount = resume.techStack?.length || 0;

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white">
          {resume.fileName || `Resume #${resume.id}`}
        </h3>
        <p className="text-gray-500 text-sm">
          {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        {experienceCount > 0 && <span>{experienceCount} experience{experienceCount !== 1 ? 's' : ''}</span>}
        {educationCount > 0 && <span>{educationCount} education{educationCount !== 1 ? 's' : ''}</span>}
        {techStackCount > 0 && <span>{techStackCount} tech skills</span>}
      </div>
    </div>
  );
}
