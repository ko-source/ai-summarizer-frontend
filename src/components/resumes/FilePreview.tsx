"use client";

import FileIcon from "../svgIcons/FileIcon";
import CloseIcon from "../svgIcons/CloseIcon";
import { formatSize } from "@/lib/utils";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function FilePreview({
  file,
  onRemove,
}: FilePreviewProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <FileIcon className="h-8 w-8 text-indigo-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 shrink-0 p-2 text-gray-400 hover:text-red-400"
        >
          <CloseIcon className="h-5 w-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
