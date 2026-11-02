import Link from "next/link";
import type { ReactNode } from "react";
import { PinIcon } from "@/components/Account/icons";
import { TruckIcon } from "@/components/Checkout/icons";
import type { Order } from "@/data/orders";
import { money } from "@/lib/card";
import { formatDate, formatRange, getOrderTotals } from "@/lib/orders";

const CardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

function InfoCard({ icon, title, lines }: { icon: ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-sm border border-black/10 bg-[#fdfcf9] p-5">
      <div className="flex items-center gap-3 text-[#3c5048]">
        {icon}
        <h3 className="text-sm font-semibold text-black">{title}</h3>
      </div>
      <div className="mt-4 flex flex-col gap-1 text-xs text-[#6b6b63]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export function OrderInfoCards({ order }: { order: Order }) {
  const { address: a, payment, carrier, trackingNumber, estimatedDelivery: d } = order;
  const totals = getOrderTotals(order);
  const shortTracking = `${trackingNumber.slice(0, 4)}...${trackingNumber.slice(-4)}`;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <InfoCard
        icon={<PinIcon size={20} />}
        title="Shipping address"
        lines={[a.name, a.street, `${a.city}, ${a.state} ${a.zip}`, a.country]}
      />
      <InfoCard
        icon={<CardIcon />}
        title="Payment method"
        lines={[
          `${payment.brand} ending in ${payment.last4}`,
          payment.name,
          `Paid ${formatDate(payment.paidAt, { month: "short", day: "numeric", year: "numeric" })}`,
          `${money(totals.total)} USD`,
        ]}
      />
      <InfoCard
        icon={<TruckIcon size={20} />}
        title="Delivery information"
        lines={[
          carrier,
          order.shipping === 0 ? "Complimentary delivery" : `${money(order.shipping)} delivery`,
          `Tracking: ${shortTracking}`,
          `Expected ${formatRange(d.from, d.to, "short")}`,
        ]}
      />
    </div>
  );
}

export function OrderHelp() {
  return (
    <div className="flex flex-col gap-4 bg-[#dfe8e2] p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#2f3f38]">Need help with this order?</p>
        <p className="text-xs text-[#3c5048]">Client Care is available daily, 8am–8pm EST.</p>
      </div>
      <Link
        href="/contact"
        className="w-fit rounded-sm border border-black/15 bg-white px-6 py-3 text-sm text-black transition hover:bg-black/5"
      >
        Contact Client Care
      </Link>
    </div>
  );
}