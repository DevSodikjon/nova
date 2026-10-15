import Image from "next/image";
import Link from "next/link";
import { product, type Product } from "@/data/products";
import { recentOrder as order } from "@/data/account";

export default function recentOrder() {
  const items = order.items
    .map((id) => product.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#6b6b63]">Recent order</p>
          <h2 className="mt-1 text-2xl font-light text-black">{order.id}</h2>
        </div>
        <span className="rounded-full bg-[#dfe8e2] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c5048]">
          {order.status}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            {items.map((p) => (
              <div key={p.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                <Image src={p.images[0]} alt={p.alt} fill sizes="64px" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="text-sm text-[#6b6b63]">
            <p>
              Placed {order.placedAt} · {items.length} items
            </p>
            <p className="text-black">Estimated delivery {order.delivery}</p>
            <p>Total ${order.total.toFixed(2)}</p>
          </div>
        </div>

        <Link
          href={`/account/orders/${order.id}`}
          className="w-fit rounded-sm border border-black/20 bg-white px-8 py-3 text-sm text-black transition hover:bg-black/5"
        >
          View order
        </Link>
      </div>
    </section>
  );
}