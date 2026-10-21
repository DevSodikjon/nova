import Link from "next/link";
import { money } from "@/lib/card";
import type { PlacedOrder } from "@/lib/checkout";

export default function OrderPlaced({ order }: { order: PlacedOrder }) {
  return (
    <div className="bg-[#f4f1ea] py-16 sm:py-24">
      <div className="container max-w-xl text-center">
        <span className="check-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path className="check-draw" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>

        <h1 className="mt-6 text-4xl font-light text-black">Thank you, {order.firstName}.</h1>
        <p className="mt-3 text-[#6b6b63]">
          Order <span className="font-semibold text-black">{order.id}</span> is confirmed. A receipt will be sent to{" "}
          {order.email}.
        </p>
        <p className="mt-1 text-sm text-[#6b6b63]">Total {money(order.total)}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="rounded-sm bg-[#1c1c1a] px-6 py-3.5 text-sm text-white transition hover:bg-black/85">
            Continue shopping
          </Link>
          <Link href="/account" className="rounded-sm border border-black/15 bg-white px-6 py-3.5 text-sm text-black transition hover:bg-black/5">
            View account
          </Link>
        </div>
      </div>
    </div>
  );
}