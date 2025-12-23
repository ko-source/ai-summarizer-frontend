"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mixed, object } from "yup";
import Button from "@/components/button";
import toast from "react-hot-toast";
import { useResumeStore } from "@/store/resumeStore";
import FileUploadZone from "@/components/resumes/FileUploadZone";
import FilePreview from "@/components/resumes/FilePreview";
import {
  ALLOWED_RESUME_MIME_TYPES,
  RESUME_MAX_FILE_SIZE_BYTES,
} from "@/lib/constants";

const schema = object({
  file: mixed()
    .required("File is required")
    .test(
      "fileType",
      "Invalid file type. Supported formats: PDF, Word, Text, or Images (JPG, PNG, GIF, WEBP).",
      (value) => {
        if (!value || !(value instanceof File)) return false;
        return ALLOWED_RESUME_MIME_TYPES.includes(value.type);
      }
    )
    .test("fileSize", "File size exceeds 10MB limit.", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= RESUME_MAX_FILE_SIZE_BYTES;
    }),
}).required();

type FormValues = {
  file: File | null;
};

export default function ResumeExtractorPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, error, extractResume, clearResume } = useResumeStore();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      file: null,
    },
  });

  const file = useWatch({ control, name: "file" });

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
      const resumeId = useResumeStore.getState().currentResume?.id;
      if (resumeId) {
        router.push(`/resumes/${resumeId}`);
      }
    } catch {
      toast.error(error || "Failed to extract resume.");
    }
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

      </div>
    </div>
  );
}
