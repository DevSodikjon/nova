import Link from "next/link";

export default function MembersBanner() {
  return (
    <section className="bg-[#2e3f38] py-14 sm:py-20">
      <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Nova members</p>

          <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white">
            Private access, thoughtfully offered.
          </h2>

          <p className="mt-4 max-w-md text-white/70">
            Join for early collection previews, complimentary alterations and considered rewards.
          </p>
        </div>

        <Link
          href="/membership"
          className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md bg-[#faf8f3] px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
        >
          Discover membership
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}