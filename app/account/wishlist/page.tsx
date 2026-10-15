"use client";

import AccountShell from "@/components/Account/accountShell";
import WishlistView from "@/components/Account/wshlistView";
import { product, type Product } from "@/data/products";
import { useShop } from "@/context/shopContext";
import { firstAvailableVariant } from "@/lib/stock";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  const items = wishlist
    .map((id) => product.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const available = items.filter((p) => firstAvailableVariant(p));

  function addOne(id: string) {
    const p = product.find((x) => x.id === id);
    const v = p && firstAvailableVariant(p);
    if (!v) return;
    addToCart({ productId: id, color: v.color, size: v.size, qty: 1 });
  }

  return (
    <AccountShell
      title="Wishlist"
      subtitle={`${items.length} ${items.length === 1 ? "piece" : "pieces"} saved · your edit stays with you.`}
      right={
        items.length > 0 && (
          <button
            type="button"
            onClick={() => available.forEach((p) => addOne(p.id))}
            disabled={available.length === 0}
            className="w-fit rounded-sm border border-black/15 bg-white px-6 py-3 text-sm text-black transition hover:bg-black/5 disabled:opacity-50"
          >
            Add all available to cart
          </button>
        )
      }
    >
      <WishlistView items={items} onRemove={toggleWishlist} onAddToCart={addOne} />
    </AccountShell>
  );
}