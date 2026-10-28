import Image from "next/image";
import Link from "next/link";
import { money, type CartLine, type CartTotals } from "@/lib/card";
import { ChatIcon, LockIcon, RefreshIcon, ShieldIcon } from "./icons";

type CheckoutSummaryProps = {
  lines: CartLine[];
  totals: CartTotals;
  onPlaceOrder: () => void;
};

const trust = [
  { icon: <ShieldIcon />, text: "Payments secured with 256-bit encryption" },
  { icon: <RefreshIcon />, text: "30-day returns on eligible pieces" },
  { icon: <ChatIcon />, text: "Client care available 8am–8pm EST" },
];

export default function CheckoutSummary({ lines, totals, onPlaceOrder }: CheckoutSummaryProps) {
  return (
    <aside id="order-summary" className="h-fit rounded-sm border border-black/10 bg-[#fdfcf9] p-6 lg:sticky lg:top-24 ">
      <div className="flex items-start justify-between ">
        <h2 className="text-2xl font-medium text-black">Your order</h2>
        <Link href="/cart" className="text-xs text-[#6b6b63] underline underline-offset-4">
          Edit cart
        </Link>
      </div>

      <ul className="mt-6 flex flex-col gap-5">
        {lines.map(({ item, product: p, lineTotal }) => (
          <li key={`${item.productId}|${item.color}|${item.size}`} className="flex items-center gap-4">
            <div className="relative h-16 w-14 shrink-0">
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image src={p.images[0]} alt={p.alt} fill sizes="56px" className="object-cover" />
              </div>
              <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1c1c1a] text-[10px] font-semibold text-white">
                {item.qty}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-black">{p.name}</p>
              <p className="text-xs text-[#9a9a92]">
                {item.size} · {item.color}
              </p>
            </div>

            <span className="text-sm text-black">{money(lineTotal)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Subtotal</dt>
          <dd className="font-semibold text-black">{money(totals.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Shipping</dt>
          <dd className="font-semibold text-black">{totals.shipping === 0 ? "Complimentary" : money(totals.shipping)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-[#6b6b63]">Estimated tax</dt>
          <dd className="font-semibold text-black">{money(totals.tax)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-baseline justify-between border-t border-black/10 pt-6">
        <span className="text-lg font-semibold text-black">Total</span>
        <span className="text-2xl font-semibold text-black">{money(totals.total)}</span>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-[#1c1c1a] py-4 text-sm text-white transition hover:bg-black/85"
      >
        Place order
        <LockIcon size={14} />
      </button>

      <p className="mt-4 text-center text-xs text-[#9a9a92]">
        By placing your order, you agree to NOVA&apos;s terms and privacy policy.
      </p>

      <ul className="mt-5 flex flex-col gap-2 text-xs text-[#6b6b63]">
        {trust.map((t) => (
          <li key={t.text} className="flex items-center gap-2">
            <span className="text-[#3c5048]">{t.icon}</span>
            {t.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}