"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sizes, colors } from "@/data/filters";
import type { CategoryInfo } from "@/lib/categories";

const MIN_PRICE = 75;
const MAX_PRICE = 400;

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
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // URL — yagona haqiqat manbai. Faqat search va slider mahalliy state'da
  // (ular yozilayotganda tez o'zgaradi, URL'ga biroz kechikib yoziladi)
  const [q, setQ] = useState(params.get("q") ?? "");
  const [price, setPrice] = useState(Number(params.get("max")) || MAX_PRICE);
  const activeSize = params.get("size");
  const activeColor = params.get("color");

  // URL'ni o'zgartiradi, boshqa filterlarni saqlab qoladi, sahifani 1 ga qaytaradi
  function buildHref(changes: Record<string, string | null>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    next.delete("page");
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  function update(changes: Record<string, string | null>) {
    router.replace(buildHref(changes), { scroll: false });
  }

  // Search va price: yozib/surib bo'lgach 400ms kutib URL'ga yozadi
  useEffect(() => {
    const t = setTimeout(() => {
      const urlQ = params.get("q") ?? "";
      const urlMax = Number(params.get("max")) || MAX_PRICE;
      if (urlQ !== q.trim() || urlMax !== price) {
        update({
          q: q.trim() || null,
          max: price >= MAX_PRICE ? null : String(price),
        });
      }
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, price]);

  const rows = [
    {
      name: "All pieces",
      href: buildHref({ category: null }),
      count: total,
      active: !activeCategory,
    },
    ...categories.map((c) => ({
      name: c.name,
      href: buildHref({ category: c.name }),
      count: c.count,
      active: activeCategory === c.name,
    })),
  ];

  const hasFilters =
    params.has("q") ||
    params.has("max") ||
    params.has("size") ||
    params.has("color");

  return (
    <aside className="flex w-full flex-col gap-8 lg:w-64 lg:shrink-0">
      {/* Search */}
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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products"
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#9a9a92]"
        />
      </label>

      {/* Category */}
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
              scroll={false}
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

      {/* Price */}
      <div>
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-black">
            Price
          </h3>
          <span className="text-black/40">−</span>
        </div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-5 w-full accent-black"
        />
        <div className="mt-2 flex justify-between text-sm text-[#6b6b63]">
          <span>${MIN_PRICE}</span>
          <span>${price}</span>
        </div>
      </div>

      {/* Size */}
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
              onClick={() => update({ size: activeSize === s ? null : s })}
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

      {/* Color */}
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
              onClick={() =>
                update({ color: activeColor === c.name ? null : c.name })
              }
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`h-8 w-8 rounded-full ring-1 ${
                  activeColor === c.name
                    ? "ring-2 ring-black ring-offset-2"
                    : "ring-black/10"
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
              <span className="text-[11px] text-[#6b6b63]">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            setQ("");
            setPrice(MAX_PRICE);
            update({ q: null, max: null, size: null, color: null });
          }}
          className="text-left text-sm underline"
        >
          Clear filters
        </button>
      )}
    </aside>
  );
}