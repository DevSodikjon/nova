"use client";

import { useState } from "react";

import { categories } from "@/data/filters";
import { sizes } from "@/data/filters";
import { colors } from "@/data/filters";
import Link from "next/link";
import type { CategoryInfo } from "@/lib/categories";

type ShopFiltersProps = {
  categories: CategoryInfo[];
  total: number;
  activeCategory?: string;
};

export default function ShopFilters({
  categories,
  total,
  activeCategory,
}: ShopFiltersProps) {
  const [activeSize, setActiveSize] = useState("M");

  const rows = [
    {
      name: "All pieces",
      href: "/shop",
      count: total,
      active: !activeCategory,
    },
    ...categories.map((c) => ({
      name: c.name,
      href: `/shop?category=${encodeURIComponent(c.name)}`,
      count: c.count,
      active: activeCategory === c.name,
    })),
  ];

  return (
    <aside className="flex w-full flex-col gap-8 lg:w-64 lg:shrink-0">
      <label className="flex items-center gap-2 rounded-md border border-black/15 bg-white px-4 py-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b6b63"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#9a9a92]"
        />
      </label>

      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black">
            Category
          </h3>
          <span className="text-black/40">−</span>
        </div>
        <div className="mt-3 flex flex-col gap-2.5">
          {rows.map((r) => (
            <Link
              key={r.name}
              href={r.href}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full border ${
                    r.active
                      ? "border-black bg-black ring-2 ring-inset ring-white"
                      : "border-black/30"
                  }`}
                />
                <span className="text-black">{r.name}</span>
              </span>
              <span className="text-[#9a9a92]">{r.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black">
            Price
          </h3>
          <span className="text-black/40">−</span>
        </div>
        <input
          type="range"
          min={75}
          max={400}
          defaultValue={200}
          className="mt-5 w-full accent-black"
        />
        <div className="mt-2 flex justify-between text-sm text-[#6b6b63]">
          <span>$75</span>
          <span>$400</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black">
            Size
          </h3>
          <span className="text-black/40">−</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSize(s)}
              className={`min-w-[44px] rounded-md border px-3 py-2 text-sm ${
                activeSize === s
                  ? "border-black bg-black/5 font-semibold text-black"
                  : "border-black/15 text-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black">
            Color
          </h3>
          <span className="text-black/40">−</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-4">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className="h-8 w-8 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
              <span className="text-[11px] text-[#6b6b63]">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
