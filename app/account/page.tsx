"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Account() {
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
    <div className="bg-[#faf8f3] py-10 sm:py-16">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-light text-black">
          Hi, {user.displayName ?? "there"}
        </h1>
        <p className="mt-2 text-[#6b6b63]">{user.email}</p>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 rounded-md border border-black px-6 py-3 text-sm font-medium text-black transition hover:bg-black/5"
        >
          Log out
        </button>
      </div>
    </div>
  );
}