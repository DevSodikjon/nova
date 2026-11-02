import Image from "next/image";
import Link from "next/link";
import AccountShell from "@/components/Account/accountShell";
import { product, type Product } from "@/data/products";
import type { Order } from "@/data/orders";
import { redirect } from "next/navigation";

import { money } from "@/lib/card";
import {
  formatDate,
  formatRange,
  getOrderStatus,
  getOrderTotals,
  getOrders,
  statusBadge,
} from "@/lib/orders";

function OrderCard({ order }: { order: Order }) {
  const status = getOrderStatus(order);
  const { total } = getOrderTotals(order);
  const itemCount = order.lines.reduce((sum, l) => sum + l.qty, 0);

  const items = order.lines
    .map((l) => product.find((p) => p.id === l.productId))
    .filter((p): p is Product => Boolean(p));

  const deliveryText =
    status === "delivered" && order.timeline.delivered
      ? `Delivered ${formatDate(order.timeline.delivered, { month: "short", day: "numeric" })}`
      : `Estimated delivery ${formatRange(order.estimatedDelivery.from, order.estimatedDelivery.to, "short")}`;

  return (
    <article className="rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6b63]">Order number</p>
          <h2 className="mt-1 text-2xl font-light text-black">{order.id}</h2>
          <p className="mt-1 text-xs text-[#6b6b63]">
            Placed {formatDate(order.placedAt, { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <span className="rounded-full bg-[#dfe8e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c5048]">
          {statusBadge[status]}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {items.map((p) => (
              <div key={p.id} className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm">
                <Image src={p.images[0]} alt={p.alt} fill sizes="56px" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="text-sm text-[#6b6b63]">
            <p>
              {itemCount} {itemCount === 1 ? "item" : "items"} · Total {money(total)}
            </p>
            <p className="text-black">{deliveryText}</p>
          </div>
        </div>

        <Link
          href={`/account/orders/${order.id}`}
          className="w-fit rounded-sm border border-black/20 bg-white px-8 py-3 text-sm text-black transition hover:bg-black/5"
        >
          View order
        </Link>
      </div>
    </article>
  );
}

export default async function OrdersPage() {
  const orders = await getOrders();

  if (orders.length === 1) redirect(`/account/orders/${orders[0].id}`);

  return (
    <AccountShell
      title="Orders"
      subtitle={
        orders.length === 0
          ? "Your orders will appear here."
          : `${orders.length} ${orders.length === 1 ? "order" : "orders"} · track and review your purchases.`
      }
    >
      {orders.length === 0 ? (
        <div className="flex flex-col gap-6 rounded-sm border border-black/10 bg-[#fdfcf9] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-2xl font-light text-black sm:text-3xl">No orders yet.</h2>
            <p className="mt-2 text-sm text-[#6b6b63]">When you place an order, you can follow it here.</p>
          </div>
          <Link
            href="/shop"
            className="w-fit rounded-sm bg-[#1c1c1a] px-6 py-3 text-sm text-white transition hover:bg-black/85"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </AccountShell>
  );
}

