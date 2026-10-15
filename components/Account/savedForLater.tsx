"use client";

import Link from "next/link";
import ProductCard from "@/components/Cards/productCard";
import { product, type Product } from "@/data/products";
import { useShop } from "@/context/shopContext";
import { getStockStatus } from "@/lib/stock";

export default function SavedForLater() {
  const { wishlist } = useShop();

  const items = wishlist
    .slice(0, 3)
    .map((id) => product.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-medium text-black">Saved for later</h2>
        <Link href="/account/wishlist" className="text-sm text-black underline underline-offset-4">
          View wishlist →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} {...p} stockStatus={getStockStatus(p)} />
        ))}
      </div>
    </section>
  );
}