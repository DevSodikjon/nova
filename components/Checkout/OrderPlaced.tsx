import Image from "next/image";
import Link from "next/link";
import { money } from "@/lib/card";
import type { PlacedOrder } from "@/lib/checkout";
import { ChatIcon, PinIcon, TruckIcon } from "./icons";

function formatPlaced(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${date} · ${time}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[#6b6b63]">{label}</dt>
      <dd className="font-semibold text-black">{value}</dd>
    </div>
  );
}

export default function OrderPlaced({ order }: { order: PlacedOrder }) {
  const { address: a, delivery, totals } = order;
  const street = a.apartment ? `${a.street}, ${a.apartment}` : a.street;
  const shippingValue = totals.shipping === 0 ? "Complimentary" : money(totals.shipping);

  return (
    <div className="bg-[#f4f1ea] py-12 sm:py-16">
      <div className="container max-w-4xl">
        {/* Tepa qism */}
        <div className="text-center">
          <span className="check-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dfe8e2] text-[#3c5048]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path className="check-draw" d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-[#3c5048]">Order confirmed</p>
          <h1 className="mt-3 text-4xl font-light text-black sm:text-6xl">Thank you, {order.firstName}.</h1>
          <p className="mx-auto mt-4 max-w-lg text-[#6b6b63]">
            Your order is confirmed. We&apos;re preparing each piece with care and will email tracking details as
            soon as it leaves our studio.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/account/orders"
              className="flex items-center gap-2 rounded-sm bg-[#1c1c1a] px-6 py-3.5 text-sm text-white transition hover:bg-black/85"
            >
              View order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="rounded-sm border border-black/15 bg-white px-6 py-3.5 text-sm text-black transition hover:bg-black/5"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        {/* Buyurtma kartasi */}
        <section className="mt-10 rounded-sm border border-black/10 bg-[#fdfcf9] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6b63]">Order number</p>
              <h2 className="mt-1 text-3xl font-light text-black">{order.id}</h2>
              <p className="mt-1 text-xs text-[#6b6b63]">Placed {formatPlaced(order.placedAt)}</p>
            </div>
            <span className="rounded-full bg-[#dfe8e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c5048]">
              Confirmed
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 bg-[#dfe8e2] p-5 text-[#3c5048]">
              <TruckIcon />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest">Estimated delivery</p>
                <p className="mt-1 text-lg font-semibold text-black">{delivery.range}</p>
                <p className="text-xs">
                  {delivery.label} · {delivery.cost === 0 ? "Complimentary" : money(delivery.cost)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#f4f1ea] p-5 text-[#3c5048]">
              <PinIcon />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest">Shipping to</p>
                <p className="mt-1 text-base font-semibold text-black">
                  {order.firstName} {order.lastName}
                </p>
                <p className="text-xs text-[#6b6b63]">
                  {street} · {a.city}, {a.state} {a.zip}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-8">
            <h3 className="text-xl font-medium text-black">Your pieces</h3>

            <ul className="mt-6 flex flex-col gap-6">
              {order.lines.map(({ item, product: p, lineTotal }) => (
                <li key={`${item.productId}|${item.color}|${item.size}`} className="flex items-center gap-5">
                  <div className="relative h-[85px] w-[68px] shrink-0 overflow-hidden rounded-sm">
                    <Image src={p.images[0]} alt={p.alt} fill sizes="68px" className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-black">{p.name}</p>
                    <p className="text-xs text-[#9a9a92]">
                      {item.size} · {item.color} · Qty {item.qty}
                    </p>
                  </div>

                  <span className="text-sm text-black">{money(lineTotal)}</span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8 flex  flex-col gap-3 border-t border-black/10 pt-6 text-sm">
            <Row label="Subtotal" value={money(totals.subtotal)} />
            <Row label="Shipping" value={shippingValue} />
            <Row label="Tax" value={money(totals.tax)} />
            <div className="mt-2 flex items-baseline justify-between border-t border-black/10 pt-4">
              <dt className="text-base font-semibold text-black">Total paid</dt>
              <dd className="text-2xl font-semibold text-black">{money(totals.total)}</dd>
            </div>
          </dl>
        </section>

        {/* Pastki yordam qatori */}
        <div className="mt-6 flex flex-col gap-3 text-xs text-[#6b6b63] sm:flex-row sm:items-center sm:justify-between">
          <p>Questions about your order? Client Care is here every day, 8am–8pm EST.</p>
          <Link href="/contact" className="flex items-center gap-2 text-black underline underline-offset-4">
            <ChatIcon />
            Contact Client Care
          </Link>
        </div>
      </div>
    </div>
  );
}