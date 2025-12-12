import React from 'react'

export default function Input({ type, placeholder, label,error,errorMessage }: { type: string, placeholder: string, label: string,error: boolean,errorMessage: string }) {
  return (
    <div>
        <label htmlFor={label} className="block text-sm/6 font-medium text-gray-100">{label}</label>
      <input type={type} placeholder={placeholder} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
      {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  )
}
