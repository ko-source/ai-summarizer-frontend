"use client";
import { useRouter, usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { useAuthStore } from "@/store/authStore";
import DesktopNavigation from "./navbar/desktopNavigation";
import DesktopUserMenu from "./navbar/desktopUserMenu";
import MobileMenuButton from "./navbar/mobileMenuButton";
import MobileMenu from "./navbar/mobileMenu";
import UserAvatar from "./navbar/userAvatar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { username, email, token, hasHydrated, logout } = useAuthStore();

  const isAuthenticated = hasHydrated && !!token;

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    logout();
    router.push("/sign-in");
  };

  const navigation = isAuthenticated
    ? [
        { name: "Dashboard", href: "/", current: pathname === "/" },
        {
          name: "Summaries",
          href: "/summaries",
          current: pathname?.startsWith("/summaries"),
        },
      ]
    : [
        { name: "Sign In", href: "/sign-in", current: pathname === "/sign-in" },
        { name: "Sign Up", href: "/sign-up", current: pathname === "/sign-up" },
      ];

  return (
    <Disclosure as="nav" className="bg-gray-900 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <MobileMenuButton />
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <DesktopNavigation items={navigation} />
          </div>

          {isAuthenticated && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3">
              <div className="sm:hidden">
                <UserAvatar username={username} />
              </div>

              <DesktopUserMenu
                username={username}
                email={email}
                onLogout={handleLogout}
              />
            </div>
          )}
        </div>
      </div>

      <MobileMenu
        items={navigation}
        isAuthenticated={isAuthenticated}
        username={username}
        email={email}
        onLogout={handleLogout}
      />
    </Disclosure>
  );
}
