"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { money, type CartTotals } from "@/lib/cart";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[#6b6b63]">{label}</dt>
      <dd className="font-semibold text-black">{value}</dd>
    </div>
  );
}

export default function OrderSummary({ totals }: { totals: CartTotals }) {
  const [message, setMessage] = useState("");

  function applyPromo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: backend tayyor bo'lganda promo kodni shu yerda tekshiramiz
    setMessage("Promo codes will be available soon.");
  }

  return (
    <aside className="h-fit rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <h2 className="text-2xl font-medium text-black">Order summary</h2>

      <form onSubmit={applyPromo} className="mt-6">
        <label htmlFor="promo" className="text-[11px] font-semibold uppercase tracking-widest text-black">
          Promo code
        </label>
        <div className="mt-2 flex">
          <input
            id="promo"
            name="promo"
            placeholder="Enter code"
            className="min-w-0 flex-1 border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-[#9a9a92] focus:border-black"
          />
          <button
            type="submit"
            className="bg-[#e4e9e6] px-6 text-sm font-semibold text-black transition hover:bg-[#d6ddd9]"
          >
            Apply
          </button>
        </div>
        {message && <p className="mt-2 text-xs text-[#6b6b63]">{message}</p>}
      </form>

      <dl className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm">
        <Row label="Subtotal" value={money(totals.subtotal)} />
        <Row label="Standard shipping" value={totals.shipping === 0 ? "Complimentary" : money(totals.shipping)} />
        <Row label="Estimated tax" value={money(totals.tax)} />
      </dl>

      <div className="mt-6 flex items-baseline justify-between border-t border-black/10 pt-6">
        <span className="text-lg font-semibold text-black">Total</span>
        <span className="text-2xl font-semibold text-black">{money(totals.total)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-[#1c1c1a] py-4 text-sm text-white transition hover:bg-black/85"
      >
        Proceed to checkout
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>

      <p className="mt-4 text-center text-xs text-[#9a9a92]">
        Taxes and delivery are calculated based on your destination. Secure payments via encrypted checkout.
      </p>
    </aside>
  );
}