"use client";

import UploadIcon from "../svgIcons/UploadIcon";

interface FileUploadZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function FileUploadZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  fileInputRef,
}: FileUploadZoneProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
        isDragging
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-gray-600 hover:border-gray-500 bg-gray-900/40"
      }`}
    >
      <input
        ref={fileInputRef}
        id="resume-file"
        type="file"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
        onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
        className="hidden"
      />
      <div className="space-y-3">
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400 cursor-pointer" />
        <div>
          <p className="text-sm text-gray-300">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Click to upload
            </button>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, Word, Text, or Images (MAX. 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}
