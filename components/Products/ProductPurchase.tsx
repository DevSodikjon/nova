"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { useShop } from "@/context/shopContext";
import SizeColorSelector from "./SizeColorSelector";
import QuantityStepper from "./QuantityStepper";

export default function ProductPurchase({ item }: { item: Product }) {
  const router = useRouter();
  const { addToCart, isWished, toggleWishlist } = useShop();

  const [color, setColor] = useState(item.variants[0]?.color ?? "");
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const variant = item.variants.find((v) => v.color === color && v.size === size);
  const wished = isWished(item.id);

  function changeColor(c: string) {
    setColor(c);
    setSize(null);
    setQty(1);
    setMessage("");
  }

  function changeSize(s: string) {
    setSize(s);
    setQty(1);
    setMessage("");
  }

  function add(): boolean {
    if (!variant) {
      setMessage("Please select a size");
      return false;
    }
    const ok = addToCart({ productId: item.id, color, size: variant.size, qty });
    if (ok) setMessage("Added to cart");
    return ok;
  }

  function buyNow() {
    if (add()) router.push("/cart");
  }

  const stockLine = !variant
    ? "Select a size to see availability"
    : variant.stock <= 3
    ? `Only ${variant.stock} left`
    : "In stock · ships in 1–2 days";

  return (
    <div>
      <SizeColorSelector
        variants={item.variants}
        color={color}
        size={size}
        onColorChange={changeColor}
        onSizeChange={changeSize}
      />

      <div className="mt-6 flex items-center justify-between">
        <QuantityStepper value={qty} onChange={setQty} max={variant?.stock ?? 1} />
        <p className="flex items-center gap-1.5 text-sm text-[#6b6b63]">
          <span className={`h-2 w-2 rounded-full ${variant ? "bg-green-600" : "bg-black/20"}`} />
          {stockLine}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={add}
          className="flex items-center justify-center gap-2 rounded-md bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/85"
        >
          Add to cart
        </button>

        <button
          type="button"
          onClick={buyNow}
          className="rounded-md border border-black py-3.5 text-sm font-medium text-black transition hover:bg-black/5"
        >
          Buy now
        </button>

        <button
          type="button"
          onClick={() => toggleWishlist(item.id)}
          className="flex items-center justify-center gap-2 py-2 text-sm text-black"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "black" : "none"} stroke="black" strokeWidth="2">
            <path d="M20.84 8.61C20.84 5.61 18.62 3.5 15.85 3.5C14.2 3.5 12.72 4.3 12 5.55C11.28 4.3 9.8 3.5 8.15 3.5C5.38 3.5 3.16 5.61 3.16 8.61C3.16 12.38 6.72 15.42 12 20.5C17.28 15.42 20.84 12.38 20.84 8.61Z" />
          </svg>
          {wished ? "Saved to wishlist" : "Add to wishlist"}
        </button>

        {message && (
          <p className={`text-center text-sm ${message === "Added to cart" ? "text-[#3c5048]" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}