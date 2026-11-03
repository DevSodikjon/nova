import type { Product } from "@/data/products";

export type ShopFilters = {
  q?: string;
  size?: string;
  color?: string;
  max?: number;
};

type SP = Record<string, string | string[] | undefined>;
const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export function parseFilters(sp: SP): ShopFilters {
  const max = Number(one(sp.max));
  return {
    q: one(sp.q)?.trim().toLowerCase() || undefined,
    size: one(sp.size),
    color: one(sp.color),
    max: Number.isFinite(max) && max > 0 ? max : undefined,
  };
}

export function filterProducts(list: Product[], f: ShopFilters) {
  return list.filter((p) => {
    if (f.q && !`${p.name} ${p.category}`.toLowerCase().includes(f.q)) return false;
    if (f.max && p.price > f.max) return false;
    if (f.size && !p.variants.some((v) => v.size === f.size && v.stock > 0)) return false;
    if (f.color && !p.variants.some((v) => v.color === f.color && v.stock > 0)) return false;
    return true;
  });
}

export type SortKey = "featured" | "new" | "price-asc" | "price-desc";

export function parseSort(sp: SP): SortKey {
  const s = one(sp.sort);
  return s === "new" || s === "price-asc" || s === "price-desc" ? s : "featured";
}

export function sortProducts(list: Product[], sort: SortKey) {
  const copy = [...list]; // asl massivni o'zgartirmaslik uchun nusxa
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "new":
      // Mahsulotlarda sana yo'q, shuning uchun "New" badge'lilar birinchi (tartib saqlanadi)
      return copy.sort(
        (a, b) => Number(b.badge === "New") - Number(a.badge === "New")
      );
    default:
      return copy; // featured: products.ts dagi tartib
  }
}