"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { product } from "@/data/products";
import { useShop } from "@/context/shopContext";

export default function AddedToast() {
  const { lastAdded } = useShop();
  const [visible, setVisible] = useState(false);
  const id = lastAdded?.id;

  // Yangi mahsulot qo'shilganda ko'rsatadi, 4 soniyadan keyin yashiradi
  useEffect(() => {
    if (!id) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!visible || !lastAdded) return null;

  const { item } = lastAdded;
  const p = product.find((x) => x.id === item.productId);
  if (!p) return null;

  return (
    <div
      key={lastAdded.id}
      role="status"
      aria-live="polite"
      className="toast-in fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm rounded-sm border border-black/10 bg-white p-4 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <span className="check-pop flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path className="check-draw" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-black">Added to cart</p>
          <p className="truncate text-sm text-[#6b6b63]">{p.name}</p>
          <p className="text-xs text-[#9a9a92]">
            {item.size} · {item.color} · Qty {item.qty}
          </p>
          <Link
            href="/cart"
            onClick={() => setVisible(false)}
            className="mt-2 inline-block text-sm font-medium text-black underline underline-offset-4"
          >
            View cart
          </Link>
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={() => setVisible(false)}
          className="text-black/40 transition hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}