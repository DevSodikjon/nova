import { CheckIcon } from "./icons";

const steps = ["Contact", "Shipping", "Delivery", "Payment", "Review"];

export default function CheckoutSteps({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="flex items-center">
      {steps.map((label, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        const last = i === steps.length - 1;

        return (
          <li key={label} className={`flex items-center ${last ? "" : "flex-1"}`}>
            <span
              aria-current={active ? "step" : undefined}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                done || active
                  ? "border-[#3c5048] bg-[#3c5048] text-white"
                  : "border-black/20 bg-white text-[#6b6b63]"
              }`}
            >
              {done ? <CheckIcon size={14} /> : i + 1}
            </span>

            <span
              className={`ml-2 whitespace-nowrap text-xs ${
                active ? "font-semibold text-black" : "hidden text-[#6b6b63] sm:inline"
              }`}
            >
              {label}
            </span>

            {!last && <span aria-hidden className={`mx-3 h-px flex-1 ${done ? "bg-[#3c5048]" : "bg-black/15"}`} />}
          </li>
        );
      })}
    </ol>
  );
}