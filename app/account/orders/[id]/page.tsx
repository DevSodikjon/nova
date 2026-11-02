import Link from "next/link";
import { notFound } from "next/navigation";
import AccountShell from "@/components/Account/accountShell";
import OrderTracking from "@/components/Orders/OrderTracking";
import OrderItems from "@/components/Orders/OrderItems";
import { OrderInfoCards, OrderHelp } from "@/components/Orders/OrderInfoCards";
import {
  formatLongDateTime,
  getOrder,
  getOrders,
  getOrderStatus,
  statusBadge,
} from "@/lib/orders";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) notFound();

  const hasMany = (await getOrders()).length > 1;

  const status = getOrderStatus(order);

  return (
    <AccountShell
      eyebrow={
        hasMany ? (
          <Link
            href="/account/orders"
            className="flex w-fit items-center gap-1 text-xs text-[#6b6b63] hover:text-black"
          >
            <span aria-hidden>←</span> Back to orders
          </Link>
        ) : undefined
      }
      title={`Order ${order.id}`}
      subtitle={`Placed ${formatLongDateTime(order.placedAt)}`}
      right={
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#dfe8e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c5048]">
            {statusBadge[status]}
          </span>
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-sm border border-black/15 bg-white px-6 py-3 text-sm text-black transition hover:bg-black/5"
          >
            Track package
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <OrderTracking order={order} />
        <OrderItems order={order} />
        <OrderInfoCards order={order} />
        <OrderHelp />
      </div>
    </AccountShell>
  );
}
