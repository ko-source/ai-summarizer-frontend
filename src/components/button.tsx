import React from "react";

export default function Button({
  type,
  label,
  className,
}: {
  type: string;
  label: string;
  className?: string;
}) {
  return (
    <button
      type={type as "submit" | "reset" | "button" }
      className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer ${className}`}
    >
      {label}
    </button>
  );
}
