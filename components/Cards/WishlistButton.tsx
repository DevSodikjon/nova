"use client";

import { useShop } from "@/context/shopContext";

export default function WishlistButton({ productId }: { productId: string }) {
  const { isWished, toggleWishlist } = useShop();
  const wished = isWished(productId);

  return (
    <button
      type="button"
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wished}
      onClick={() => toggleWishlist(productId)}
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:scale-105"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "red" : "none"} stroke="red" strokeWidth="2">
        <path d="M20.84 8.61C20.84 5.61 18.62 3.5 15.85 3.5C14.2 3.5 12.72 4.3 12 5.55C11.28 4.3 9.8 3.5 8.15 3.5C5.38 3.5 3.16 5.61 3.16 8.61C3.16 12.38 6.72 15.42 12 20.5C17.28 15.42 20.84 12.38 20.84 8.61Z" />
      </svg>
    </button>
  );
}