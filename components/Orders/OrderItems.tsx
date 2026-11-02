import Image from "next/image";
import { product } from "@/data/products";
import type { Order } from "@/data/orders";
import { money } from "@/lib/card";
import { formatDate, getOrderTotals } from "@/lib/orders";

export default function OrderItems({ order }: { order: Order }) {
  const totals = getOrderTotals(order);
  const itemCount = order.lines.reduce((sum, l) => sum + l.qty, 0);
  const returnBy = formatDate(order.returnEligibleUntil, { month: "short", day: "numeric" });

  return (
    <section className="rounded-sm border border-black/10 bg-[#fdfcf9]">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-2xl font-medium text-black">Order information</h2>
        <span className="text-xs text-[#6b6b63]">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="hidden grid-cols-[1fr_80px_100px] gap-4 bg-[#f4f1ea] px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-[#6b6b63] sm:grid">
        <span>Product</span>
        <span className="text-center">Qty</span>
        <span className="text-right">Price</span>
      </div>

      <ul className="divide-y divide-black/10">
        {order.lines.map((line) => {
          const p = product.find((x) => x.id === line.productId);
          if (!p) return null;

          return (
            <li
              key={`${line.productId}|${line.color}|${line.size}`}
              className="grid gap-3 px-6 py-5 sm:grid-cols-[1fr_80px_100px] sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-[76px] shrink-0 overflow-hidden rounded-sm">
                  <Image src={p.images[0]} alt={p.alt} fill sizes="76px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-black">{p.name}</p>
                  <p className="text-xs text-[#9a9a92]">
                    {line.size} · {line.color}
                  </p>
                  <p className="mt-1 text-[11px] text-[#9a9a92]">Return eligible until {returnBy}</p>
                </div>
              </div>

              <span className="text-sm text-black sm:text-center">
                <span className="text-[#9a9a92] sm:hidden">Qty </span>
                {line.qty}
              </span>
              <span className="text-sm text-black sm:text-right">{money(line.price * line.qty)}</span>
            </li>
          );
        })}
      </ul>

      <dl className="ml-auto flex w-full max-w-xs flex-col gap-3 p-6 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Subtotal</dt>
          <dd className="font-semibold text-black">{money(totals.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Shipping</dt>
          <dd className="font-semibold text-black">{totals.shipping === 0 ? "Complimentary" : money(totals.shipping)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Tax</dt>
          <dd className="font-semibold text-black">{money(totals.tax)}</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-black/10 pt-4">
          <dt className="text-base font-semibold text-black">Total</dt>
          <dd className="text-2xl font-semibold text-black">{money(totals.total)}</dd>
        </div>
      </dl>
    </section>
  );
}