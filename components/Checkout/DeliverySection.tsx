import { deliveryOptions, type DeliveryId } from "@/data/checkout";
import { money } from "@/lib/card";
import { deliveryText, getShippingCost } from "@/lib/checkout";
import CheckoutSection from "./CheckoutSection";

type DeliverySectionProps = {
  selected: DeliveryId;
  onSelect: (id: DeliveryId) => void;
  subtotal: number;
};

export default function DeliverySection({ selected, onSelect, subtotal }: DeliverySectionProps) {
  return (
    <CheckoutSection number={3} title="Delivery">
      <div role="radiogroup" aria-label="Delivery method" className="flex flex-col gap-3">
        {deliveryOptions.map((o) => {
          const active = o.id === selected;
          const cost = getShippingCost(o, subtotal);

          return (
            <label
              key={o.id}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-sm border px-5 py-4 ${
                active ? "border-[#3c5048]/40 bg-[#dfe8e2]" : "border-black/15 bg-white hover:bg-black/[0.02]"
              }`}
            >
              <span className="flex items-center gap-4">
                <input
                  type="radio"
                  name="delivery"
                  value={o.id}
                  checked={active}
                  onChange={() => onSelect(o.id)}
                  className="h-4 w-4 accent-[#3c5048]"
                />
                <span>
                  <span className="block text-sm text-black">{o.label}</span>
                  <span className="block text-xs text-[#6b6b63]">{deliveryText(o)}</span>
                </span>
              </span>
              <span className="text-sm text-black">{cost === 0 ? "Complimentary" : money(cost)}</span>
            </label>
          );
        })}
      </div>
    </CheckoutSection>
  );
}