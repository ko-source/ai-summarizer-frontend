import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DisclosureButton } from "@headlessui/react";
import { NavItem } from "@/types/types";

interface DesktopNavigationProps {
  items: NavItem[];
}

export default function DesktopNavigation({
  items,
}: DesktopNavigationProps) {
  const router = useRouter();
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
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
              "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </div>
  );
}
