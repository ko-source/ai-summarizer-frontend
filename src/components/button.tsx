export default function Button({
  type,
  label,
  className,
  onClick,
  disabled,
  variant = "primary",
}: {
  type: string;
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}) {
  const variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
    secondary: "bg-gray-500 hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500",
  };

  return (
    <button
      type={type as "submit" | "reset" | "button"}
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
