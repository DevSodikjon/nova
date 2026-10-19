import type { CartItem } from "@/context/shopContext";
import type { CartLine } from "@/lib/cart";
import CartItemRow from "./CardItemRow";

type CartListProps = {
  lines: CartLine[];
  onQtyChange: (item: CartItem, qty: number) => void;
  onRemove: (item: CartItem) => void;
};

export default function CardList({ lines, onQtyChange, onRemove }: CartListProps) {
  return (
    <div>
      <div className="hidden grid-cols-[1fr_150px_90px] gap-8 border-b border-black/10 pb-3 text-[11px] font-semibold uppercase tracking-widest text-[#6b6b63] sm:grid">
        <span>Product</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Price</span>
      </div>

      <ul className="divide-y divide-black/10">
        {lines.map((line) => (
          <CartItemRow
            key={`${line.item.productId}|${line.item.color}|${line.item.size}`}
            line={line}
            onQtyChange={(qty) => onQtyChange(line.item, qty)}
            onRemove={() => onRemove(line.item)}
          />
        ))}
      </ul>
    </div>
  );
}