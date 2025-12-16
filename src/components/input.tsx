import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string;
}

export default function Input({ type, placeholder, label, error, errorMessage, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={label} className="block text-sm/6 font-medium text-gray-100 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={label}
        className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  )
}
