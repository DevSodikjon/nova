import { product, type Product } from "@/data/products";

export type CategoryGroup = "Clothing" | "Accessories";

export type CategoryInfo = {
  name: string;
  count: number;
  cover: string; // birinchi mahsulotning rasmi
  group: CategoryGroup;
};

const accessoryCategories = ["Shoes", "Jewelry"];

// "Dresses · New season" → "Dresses"
export const categoryOf = (p: Product) => p.category.split("·")[0].trim();

// Backend tayyor bo'lganda shu funksiya fetch'ga almashadi
export async function getCategories(): Promise<CategoryInfo[]> {
  const map = new Map<string, CategoryInfo>();

  for (const p of product) {
    const name = categoryOf(p);
    const existing = map.get(name);

    if (existing) {
      existing.count += 1;
    } else {
      map.set(name, {
        name,
        count: 1,
        cover: p.images[0],
        group: accessoryCategories.includes(name) ? "Accessories" : "Clothing",
      });
    }
  }

  return [...map.values()];
}