import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useAuthGuard() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!token) {
      router.push("/sign-in");
    }
  }, [hasHydrated, token, router]);

  return { token, hasHydrated, isAuthenticated: !!token && hasHydrated };
}
