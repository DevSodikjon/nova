"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/Cards/productCard";
import type { Product } from "@/data/products";
import { getStockStatus } from "@/lib/stock";
import { HeartIcon } from "./icons";

type Filter = "all" | "available" | "low";
type Sort = "recent" | "price-asc" | "price-desc" | "name";

type WishlistViewProps = {
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
};

export default function WishlistView({ items, onRemove, onAddToCart }: WishlistViewProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6 rounded-sm border border-black/10 bg-[#fdfcf9] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#dfe8e2] text-[#3c5048]">
            <HeartIcon size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-light text-black sm:text-3xl">A space for pieces worth returning to.</h2>
            <p className="mt-2 max-w-md text-sm text-[#6b6b63]">
              Use the heart on any product to build your personal edit. Saved pieces remain across devices.
            </p>
          </div>
        </div>

        <Link
          href="/shop?sort=new"
          className="flex w-fit items-center gap-2 whitespace-nowrap rounded-sm bg-[#1c1c1a] px-6 py-3 text-sm text-white transition hover:bg-black/85"
        >
          Explore new arrivals
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    );
  }

  const inStock = items.filter((p) => getStockStatus(p) === "In stock");
  const low = items.filter((p) => getStockStatus(p) === "Low stock");

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All saved", count: items.length },
    { key: "available", label: "Available", count: inStock.length },
    { key: "low", label: "Low stock", count: low.length },
  ];

  const filtered = filter === "all" ? items : filter === "available" ? inStock : low;

  const visible = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return 0; // "recent": ro'yxat tartibi
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setFilter(active ? "all" : c.key)}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${
                  active
                    ? "border-[#3c5048]/40 bg-[#dfe8e2] text-black"
                    : "border-black/15 bg-white text-black hover:bg-black/5"
                }`}
              >
                {c.label} · {c.count}
                {active && (
                  <span aria-hidden className="text-xs text-black/60">
                    ✕
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-fit rounded-sm border border-black/15 bg-white px-4 py-2 text-sm text-black outline-none"
        >
          <option value="recent">Recently added</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="name">Name</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-[#6b6b63]">No pieces match this filter.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <div key={p.id}>
              <ProductCard {...p} stockStatus={getStockStatus(p)} />

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(p.id)}
                  className="flex-1 rounded-sm bg-[#1c1c1a] py-3 text-sm text-white transition hover:bg-black/85"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  className="rounded-sm border border-black/15 bg-white px-6 py-3 text-sm text-black transition hover:bg-black/5"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}