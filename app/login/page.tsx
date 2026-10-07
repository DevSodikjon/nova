"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const success = login(email, password);

    if (success) {
      router.push("/account");
    } else {
      setError("Email yoki password noto'g'ri");
    }
  }

  return (
    <div className="bg-[#faf8f3]">
      <div className="container py-10 sm:py-16">
        <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-2 lg:min-h-[640px]">
          <div className="relative hidden lg:block">
            <Image
              src="/images/login_image.svg"
              alt="Woman in a grey turtleneck and trousers standing beside a travertine arch"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
            <div className="absolute bottom-10 left-10 right-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest">
                Nova membership
              </p>
              <h2 className="mt-2 text-3xl font-light leading-tight">
                Your considered wardrobe, kept close.
              </h2>
            </div>
          </div>

          {/* Right: form */}
          <div className="flex items-center justify-center  px-6 py-16 sm:px-10">
            <div className="w-full max-w-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-light text-black">
                Sign in to NOVA
              </h1>
              <p className="mt-2 text-[#6b6b63]">
                Access orders, saved pieces and a checkout shaped around you.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-5"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••••"
                    className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                  />
                </label>
                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#2e3f38]"
                    />
                    <span className="text-[#6b6b63]">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-black underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-black py-3 text-sm font-medium text-white transition hover:bg-black/85"
                >
                  Login
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-black/10" />
                <span className="text-xs font-medium uppercase tracking-widest text-[#9a9a92]">
                  Or continue with
                </span>
                <span className="h-px flex-1 bg-black/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-md border border-black/15 bg-[#faf8f3] py-3 text-sm font-medium text-black transition hover:bg-black/5"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.365 1.43c0 1.14-.46 2.1-1.19 2.83-.8.8-2.1 1.42-3.18 1.33-.13-1.1.46-2.25 1.19-2.97.8-.8 2.2-1.4 3.18-1.19zM20.5 17.1c-.56 1.3-1.24 2.56-2.26 3.68-1 1.1-2.1 2.2-3.56 2.2-1.4 0-1.86-.86-3.46-.86-1.6 0-2.14.84-3.46.9-1.4.06-2.56-1.2-3.56-2.3-2.06-2.26-3.64-6.4-1.5-9.2 1.06-1.4 2.76-2.26 4.5-2.3 1.44-.02 2.76.96 3.46.96.7 0 2.3-1.2 3.86-1.02.66.03 2.5.27 3.7 2.03-.1.06-2.2 1.3-2.18 3.84.02 3.02 2.66 4.03 2.66 4.07z" />
                  </svg>
                  Apple
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-md border border-black/15 bg-[#faf8f3] py-3 text-sm font-medium text-black transition hover:bg-black/5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.52 12.27c0-.82-.07-1.42-.22-2.04H12v3.71h6.57c-.13 1.09-.86 2.73-2.47 3.84l-.02.15 3.59 2.78.25.02c2.28-2.1 3.6-5.2 3.6-8.46z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.96-1.06 7.95-2.88l-3.79-2.94c-1.02.7-2.4 1.18-4.16 1.18-3.18 0-5.88-2.1-6.84-5.02l-.14.01-3.73 2.89-.05.13C3.23 21.3 7.3 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.16 14.34a7.2 7.2 0 0 1-.38-2.34c0-.81.14-1.6.37-2.34l-.01-.16-3.78-2.94-.12.06A11.98 11.98 0 0 0 0 12c0 1.94.47 3.77 1.24 5.38z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c2.25 0 3.77.97 4.64 1.78l3.39-3.31C17.95 1.19 15.24 0 12 0 7.3 0 3.23 2.7 1.24 6.62l3.9 3.04C6.12 6.85 8.82 4.75 12 4.75z"
                    />
                  </svg>
                  Google
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-[#6b6b63]">
                New to NOVA?{" "}
                <Link
                  href="/register"
                  className="font-medium text-black underline underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
