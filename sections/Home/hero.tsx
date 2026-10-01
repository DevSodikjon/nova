import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <div className="container">
        <img
          src="/images/Hero_image.svg"
          alt="Model standing beside a floor-to-ceiling window overlooking the coast"
          className="absolute inset-0 h-full w-full object-cover "
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

        <div className="relative z-10 flex max-w-2xl flex-col justify-center gap-[26px] pt-[178px] pb-[286px] sm:px-10 lg:px-20 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest">
            The Autumn Study · 2026
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05]">
            Form, softened.
          </h1>

          <p className="max-w-md text-base text-white/80">
            A study in quiet structure—fluid layers, considered tailoring and
            tactile pieces designed to live in.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={"/categories"}
              className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-black/85"
            >
              Shop the collection
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href={"/about"}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              View the story
            </Link>
          </div>
        </div>

        <span className="absolute bottom-6 right-6 z-10 text-[11px] font-medium uppercase tracking-widest text-white/80">
          Nova Editorial&nbsp;/&nbsp;Look 01
        </span>
      </div>
    </section>
  );
}
