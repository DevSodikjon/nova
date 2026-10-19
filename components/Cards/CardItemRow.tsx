import Image from "next/image";
import Link from "next/link";
import QuantityStepper from "@/components/Products/QuantityStepper";
import type { CartLine } from "@/lib/card";
import { money } from "@/lib/card";

type CartItemRowProps = {
  line: CartLine;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
};

function stockInfo(stock: number | undefined) {
  if (stock === undefined) return { text: "", className: "" };
  if (stock === 0) return { text: "Out of stock", className: "text-red-600" };
  if (stock <= 3) return { text: `Only ${stock} left`, className: "text-[#8a6d1f]" };
  return { text: "In stock", className: "text-[#3c5048]" };
}

export default function CardItemRow({ line, onQtyChange, onRemove }: CartItemRowProps) {
  const { item, product: p, variant, lineTotal } = line;
  const stock = stockInfo(variant?.stock);
  const sizeLabel = item.size.toLowerCase() === "one size" ? "One size" : `Size ${item.size}`;

  return (
    <li className="grid gap-4 py-6 sm:grid-cols-[1fr_150px_90px] sm:items-center sm:gap-8">
      <div className="flex gap-4">
        <Link
          href={`/productDetails/${p.id}`}
          className="relative block h-36 w-28 shrink-0 overflow-hidden rounded-sm"
        >
          <Image src={p.images[0]} alt={p.alt} fill sizes="112px" className="object-cover" />
        </Link>

        <div className="flex min-w-0 flex-col justify-center">
          <Link href={`/productDetails/${p.id}`} className="text-lg font-light text-black hover:underline">
            {p.name}
          </Link>
          <p className="mt-1 text-sm text-[#9a9a92]">
            {sizeLabel} · {item.color}
          </p>
          <p className={`mt-2 text-xs font-semibold ${stock.className}`}>{stock.text}</p>
          <button
            type="button"
            onClick={onRemove}
            className="mt-2 w-fit text-xs text-[#6b6b63] underline-offset-4 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-center">
        <QuantityStepper value={item.qty} onChange={onQtyChange} max={variant?.stock ?? item.qty} />
        <span className="text-base text-black sm:hidden">{money(lineTotal)}</span>
      </div>

      <p className="hidden text-right text-base text-black sm:block">{money(lineTotal)}</p>
    </li>
  );
}