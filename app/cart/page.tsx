"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/shopContext";
import { buildCardLines, getCardTotals } from "@/lib/card";
import CartList from "@/components/Cards/CardList";
import OrderSummary from "@/components/Cards/OrderSummary";
import CartPerks from "@/components/Cards/CardPerks";
import EmptyCart from "@/components/Cards/EmptyCard";

export default function CardPage() {
  const { user } = useAuth();
  const { cart, ready, setCartQty, removeFromCart } = useShop();

  if (!ready) return null; // ma'lumot yuklanguncha hech narsa ko'rsatmaydi

  const lines = buildCardLines(cart);
  const totals = getCardTotals(lines);
  const itemCount = lines.reduce((sum, l) => sum + l.item.qty, 0);

  return (
    <div className="bg-[#f4f1ea] py-8 sm:py-12">
      <div className="container">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="font-medium text-black">Your cart</span>
        </nav>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-light text-black sm:text-5xl">Your cart</h1>
            {itemCount > 0 && (
              <p className="mt-2 text-[#6b6b63]">
                {itemCount} {itemCount === 1 ? "item" : "items"} reserved for 30 minutes
              </p>
            )}
          </div>

          {itemCount > 0 && (
            <p className="flex items-center gap-2 text-xs font-semibold text-[#3c5048]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              Secure checkout
            </p>
          )}
        </div>

        {lines.length === 0 ? (
          <EmptyCart signedIn={Boolean(user)} />
        ) : (
          <>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
              <div className="flex flex-col gap-8">
                <CartList lines={lines} onQtyChange={setCartQty} onRemove={removeFromCart} />
                <CartPerks />
              </div>

              <OrderSummary totals={totals} />
            </div>

            <div className="mt-10 flex items-start gap-3 bg-[#efe6cf] p-5 text-[#6b5a1f]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-5M12 8h.01" />
              </svg>
              <div>
                <p className="text-sm font-semibold">Your selections are not held until checkout</p>
                <p className="text-sm">Popular sizes can move quickly. Complete checkout to confirm availability.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}