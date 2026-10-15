import type { Product } from "@/data/products";

export const LOW_STOCK_THRESHOLD = 30; // shu sondan kam bo'lsa "Low stock"

export function totalStock(p: Product): number {
  return p.variants.reduce((sum, v) => sum + v.stock, 0);
}

export function getStockStatus(p: Product): "In stock" | "Low stock" {
  return totalStock(p) <= LOW_STOCK_THRESHOLD ? "Low stock" : "In stock";
}

export function firstAvailableVariant(p: Product) {
  return p.variants.find((v) => v.stock > 0);
}