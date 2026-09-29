"use client";
import "@/components/Navbar/Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import {headerLinks} from "@/data/navigation"

import { usePathname } from "next/navigation";


const actions = [
  {
    name: "Search",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="3" />
        <path
          d="M16.5 16.5L21 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Wishlist",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.84 8.61C20.84 5.61 18.62 3.5 15.85 3.5C14.2 3.5 12.72 4.3 12 5.55C11.28 4.3 9.8 3.5 8.15 3.5C5.38 3.5 3.16 5.61 3.16 8.61C3.16 12.38 6.72 15.42 12 20.5C17.28 15.42 20.84 12.38 20.84 8.61Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Cart",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 4H5L7.2 15.2C7.4 16.2 8.28 17 9.32 17H17.5C18.45 17 19.27 16.36 19.5 15.44L21 9H6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="20" r="1" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Account",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="7" r="3.5" stroke="currentColor" strokeWidth="3" />
        <path
          d="M4.5 21C4.5 16.86 7.86 14 12 14C16.14 14 19.5 16.86 19.5 21"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header>
      <main className="container">
        <div className="header_box flex items-center justify-between py-[22px]">
          <div className="logo">
            <Link href={"/"}>
              <Image
                src="/Images/Nova_black.svg"
                alt="nova"
                width={76}
                height={0}
              />
            </Link>
          </div>

          <nav className="flex gap-[30px]">
            {headerLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
          relative
          text-[18px]
          font-medium
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:bg-black
          after:transition-all
          after:duration-300
          after:ease-out
          ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
        `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="actions flex gap-[22px]">
            {actions.map((action) => (
              <button
                key={action.name}
                className="
    flex
    items-center
    gap-2
    font-medium
    text-black
    transition-all
    duration-200
    hover:text-gray-600
    hover:scale-[1.03]
    cursor-pointer
  "
              >
                {action.icon}
                {action.name}
              </button>
            ))}
          </div>
        </div>
      </main>
    </header>
  );
}
