import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Early access to seasonal collections",
  "Complimentary alterations on select pieces",
  "Faster checkout and considered recommendations",
];

export default function RegisterPage() {
  return (
    <div className="container py-10 sm:py-16">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2 lg:min-h-[640px]">
        {/* Left: form */}
        <div className="flex items-center justify-center bg-[#faf8f3] px-6 py-16 sm:px-10">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
              Join NOVA
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-light text-black">
              Create your account
            </h1>
            <p className="mt-2 text-[#6b6b63]">
              Save your edit, track orders and receive private access to new
              collections.
            </p>

            <form className="mt-8 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">
                    First name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-black">
                    Last name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-black">
                  Email address
                </span>
                <input
                  type="email"
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
                  required
                  placeholder="••••••••••"
                  className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6b6b63]">
                  Password strength · Strong
                </p>
                <p className="text-xs text-[#9a9a92]">
                  Use 8+ characters with an uppercase letter, number and symbol.
                </p>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-black">
                  Confirm password
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••••"
                  className="rounded-md border border-black/15 bg-[#faf8f3] px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
                />
              </label>

              <label className="flex items-start gap-2 text-sm text-[#6b6b63]">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#2e3f38]"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-black underline underline-offset-4"
                  >
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-black underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2 text-sm text-[#6b6b63]">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-[#2e3f38]"
                />
                <span>
                  Keep me close to new collections, studio stories and private
                  offers.
                </span>
              </label>

              <button
                type="submit"
                className="mt-1 rounded-md bg-black py-3 text-sm font-medium text-white transition hover:bg-black/85"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6b6b63]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: image with benefits card, hidden on mobile/tablet */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/register_image.svg"
            alt="Two women laughing together in a bright, plant-filled living room"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />

          <div className="absolute bottom-10 left-10 right-10 bg-[#faf8f3] p-8">
            <h2 className="text-2xl font-semibold text-black">
              A quieter kind of membership.
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-black"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-black" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
