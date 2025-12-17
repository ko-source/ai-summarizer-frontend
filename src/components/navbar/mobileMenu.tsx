"use client";

import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { cn } from "@/lib/utils";
import UserAvatar from "./userAvatar";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";

interface MobileMenuProps {
  items: NavItem[];
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  onLogout: () => void;
}

export default function MobileMenu({
  items,
  isAuthenticated,
  username,
  email,
  onLogout,
}: MobileMenuProps) {
  const router = useRouter();

  return (
    <DisclosurePanel className="sm:hidden">
      <>
        <DisclosureButton
          as="div"
          className="fixed inset-0 bg-black/50 z-40"
          aria-label="Close menu"
          data-mobile-menu-overlay="true"
        />

        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-xl">
          <div className="h-full overflow-y-auto">
            <div className="px-4 pt-6 pb-4 space-y-4">
              {isAuthenticated && (
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-700">
                  <UserAvatar username={username} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {username}
                    </p>
                    <p className="text-sm text-gray-400 truncate">{email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {items.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="button"
                    onClick={() => router.push(item.href)}
                    aria-current={item.current ? "page" : undefined}
                    className={cn(
                      item.current
                        ? "bg-gray-950/50 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>

              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-700">
                  <DisclosureButton
                    as="button"
                    onClick={onLogout}
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Logout
                  </DisclosureButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </DisclosurePanel>
  );
}
