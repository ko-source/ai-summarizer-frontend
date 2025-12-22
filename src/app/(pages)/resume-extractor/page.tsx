"use client";

import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, object } from "yup";
import Button from "@/components/button";
import toast from "react-hot-toast";
import { useResumeStore } from "@/store/resumeStore";
import FileUploadZone from "@/components/resume-extractor/FileUploadZone";
import FilePreview from "@/components/resume-extractor/FilePreview";
import ExperienceSection from "@/components/resume-extractor/ExperienceSection";
import EducationSection from "@/components/resume-extractor/EducationSection";
import TechStackSection from "@/components/resume-extractor/TechStackSection";

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const maxFileSize = 10 * 1024 * 1024; // 10MB

const schema = object({
  file: mixed()
    .required("File is required")
    .test(
      "fileType",
      "Invalid file type. Supported formats: PDF, Word, Text, or Images (JPG, PNG, GIF, WEBP).",
      (value) => {
        if (!value || !(value instanceof File)) return false;
        return allowedMimeTypes.includes(value.type);
      }
    )
    .test("fileSize", "File size exceeds 10MB limit.", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= maxFileSize;
    }),
});

type FormValues = {
  file: File | null;
};

export default function ResumeExtractorPage() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resume, isLoading, error, extractResume, clearResume } =
    useResumeStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as never,
    defaultValues: {
      file: null,
    },
  });

  const file = watch("file");

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      setValue("file", selectedFile, { shouldValidate: true });
      clearResume();
    } else {
      setValue("file", null, { shouldValidate: false });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    handleFileSelect(droppedFile);
  };

  const handleRemoveFile = () => {
    setValue("file", null, { shouldValidate: false });
    clearResume();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.file) {
      toast.error("Please select a file.");
      return;
    }
    try {
      await extractResume(data.file);
      toast.success("Resume extracted successfully!");
    } catch {
      toast.error(error || "Failed to extract resume.");
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto">
      <div className="w-full flex flex-col items-start justify-start space-y-6">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Resume Extractor
          </h1>
          <p className="text-gray-300 text-sm md:text-base mb-4">
            Upload a resume file (PDF, Word, Text, or Image) and we&apos;ll extract
            the candidate&apos;s experience, education, and tech stack for you.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="resume-file"
                className="block text-sm font-medium text-gray-100 mb-2"
              >
                Upload Resume
              </label>

              <Controller
                name="file"
                control={control}
                render={() => (
                  <>
                    {!file ? (
                      <FileUploadZone
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onFileSelect={handleFileSelect}
                        fileInputRef={
                          fileInputRef as React.RefObject<HTMLInputElement>
                        }
                      />
                    ) : (
                      <FilePreview
                        file={file}
                        onRemove={handleRemoveFile}
                        formatSize={formatSize}
                      />
                    )}
                    <input
                      ref={fileInputRef}
                      id="resume-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0] ?? null;
                        handleFileSelect(selectedFile);
                      }}
                      className="hidden"
                    />
                  </>
                )}
              />
              {errors.file && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.file.message}
                </p>
              )}
            </div>

            <div className="max-w-xs">
              <Button
                type="submit"
                label={isLoading ? "Extracting..." : "Upload & Extract"}
                disabled={isLoading || !file}
              />
            </div>
          </form>
        </div>

        {resume && (
          <div className="w-full mt-6 space-y-8">
            <ExperienceSection experience={resume.experience || []} />
            <EducationSection education={resume.education || []} />
            <TechStackSection techStack={resume.techStack || []} />

            {!resume.experience?.length &&
              !resume.education?.length &&
              !resume.techStack?.length && (
                <p className="text-sm text-gray-300">
                  No structured data was extracted from this resume.
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
