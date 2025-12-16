interface UserAvatarProps {
  username: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function UserAvatar({
  username,
  size = "md",
  className = "",
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initial = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold ${sizeClasses[size]} ${className}`}
    >
      {initial}
    </div>
  );
}
