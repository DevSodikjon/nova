"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, BoxIcon, HeartIcon, PinIcon, GearIcon, LogoutIcon } from "./icons";

const links = [
  { label: "Personal Information", href: "/account", icon: UserIcon },
  { label: "Orders", href: "/orders", icon: BoxIcon },
  { label: "Wishlist", href: "/account/wishlist", icon: HeartIcon },
  { label: "Saved Addresses", href: "/addresses", icon: PinIcon },
  { label: "Settings", href: "/settings", icon: GearIcon },
];

type AccountSidebarProps = {
  name: string;
  email: string;
  onLogout: () => void;
};

export default function accountSidebar({ name, email, onLogout }: AccountSidebarProps) {
  const pathname = usePathname();
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside>
      <div className="flex items-center gap-3 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dfe8e2] text-sm font-semibold text-[#3c5048]">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-black">{name}</p>
          <p className="truncate text-xs text-[#6b6b63]">{email}</p>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {links.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-sm ${
                active ? "bg-[#dfe8e2] text-black" : "text-black hover:bg-black/5"
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-3 text-left text-sm text-black hover:bg-black/5"
        >
          <LogoutIcon />
          Logout
        </button>
      </nav>
    </aside>
  );
}