import Link from "next/link";
import WardrobeCard from "@/components/Cards/wardrobeCard";

import { moods } from "@/data/navigation";

export default function wardrobe() {
  return (
    <section className="bg-[#f4f1ea] py-20">
      <div className="container">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
              Shop by mood
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light text-black">
              A wardrobe with room to breathe
            </h2>
          </div>

          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-black underline underline-offset-4 whitespace-nowrap"
          >
            Explore all categories
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-[38px] sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:items-start">
          {moods.map((mood) => (
            <WardrobeCard key={mood.title} {...mood} />
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-6 flex sm:hidden items-center justify-center gap-2 text-sm font-medium text-black underline underline-offset-4"
        >
          Explore all categories
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
