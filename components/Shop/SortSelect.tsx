"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function onChange(next: string) {
    const p = new URLSearchParams(params.toString());
    if (next === "featured") p.delete("sort");
    else p.set("sort", next);
    p.delete("page"); // tartib o'zgarsa 1-sahifaga qaytamiz
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-fit rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none"
    >
      <option value="featured">Sort: Featured</option>
      <option value="new">Sort: Newest</option>
      <option value="price-asc">Sort: Price, low to high</option>
      <option value="price-desc">Sort: Price, high to low</option>
    </select>
  );
}