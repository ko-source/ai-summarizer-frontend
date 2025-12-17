"use client";

import { Menu } from "@headlessui/react";
import Button from "../button";
import { cn } from "@/lib/utils";
import UserAvatar from "./userAvatar";

interface DesktopUserMenuProps {
  username: string | null;
  email: string | null;
  onLogout: () => void;
}

export default function DesktopUserMenu({
  username,
  email,
  onLogout,
}: DesktopUserMenuProps) {
  return (
    <Menu as="div" className="relative hidden sm:block">
      <Menu.Button className="md:cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors">
        <UserAvatar username={username} />
      </Menu.Button>
      <Menu.Items
        transition
        className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      >
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="text-sm font-medium text-white">{username}</p>
          <p className="text-sm text-gray-400 truncate">{email}</p>
        </div>
        <Menu.Item>
          {({ focus }) => (
              <Button
              type="button"
              label="Logout"
              variant="secondary"
              className={cn(
                focus ? "bg-gray-700" : "",
                "block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
              )}
              onClick={onLogout}
            />
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
