"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AccountSidebar from "./accountSidebar";

type AccountShellProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
};

export default function AccountShell({ title, subtitle, right, children }: AccountShellProps) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user) return null;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <div className="bg-[#f4f1ea] py-8 sm:py-12">
      <div className="container">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">My NOVA</p>

        <div className="mt-2 flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-light text-black sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-2 text-[#6b6b63]">{subtitle}</p>}
          </div>
          {right}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <AccountSidebar
            name={user.displayName ?? "Guest"}
            email={user.email ?? ""}
            onLogout={handleLogout}
          />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}