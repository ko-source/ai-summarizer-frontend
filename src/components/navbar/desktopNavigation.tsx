import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

interface DesktopNavigationProps {
  items: NavItem[];
}

export default function DesktopNavigation({
  items,
}: DesktopNavigationProps) {
  return (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={cn(
              item.current
                ? "bg-gray-950/50 text-white"
                : "text-gray-300 hover:bg-white/5 hover:text-white",
              "rounded-md px-3 py-2 text-sm font-medium"
            )}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
