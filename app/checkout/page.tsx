"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/shopContext";
import { buildCardLines } from "@/lib/card";
import type { PlacedOrder } from "@/lib/checkout";
import CheckoutView from "@/components/Checkout/CheckoutView";
import OrderPlaced from "@/components/Checkout/OrderPlaced";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { cart, ready, clearCart } = useShop();
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);

  // Kirmagan bo'lsa login'ga yuboradi
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (!ready || !user) return null;

  if (placed) return <OrderPlaced order={placed} />;

  const lines = buildCardLines(cart);

  if (lines.length === 0) {
    return (
      <div className="bg-[#f4f1ea] py-16 sm:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-light text-black">Your cart is empty</h1>
          <p className="mt-3 text-[#6b6b63]">Add something before checking out.</p>
          <Link href="/shop" className="mt-6 inline-block rounded-sm bg-[#1c1c1a] px-6 py-3.5 text-sm text-white transition hover:bg-black/85">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const [firstName = "", ...rest] = (user.displayName ?? "").split(" ");
  const defaults = { email: user.email ?? "", firstName, lastName: rest.join(" ") };

  return (
    <CheckoutView
      lines={lines}
      defaults={defaults}
      onPlaced={(order) => {
        setPlaced(order);
        clearCart();
      }}
    />
  );
}