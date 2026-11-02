import { CheckIcon } from "@/components/Checkout/icons";
import type { Order } from "@/data/orders";
import {
  formatRange,
  formatShortDateTime,
  getOrderStatus,
  statusHeadline,
  stepLabels,
  stepOrder,
} from "@/lib/orders";

export default function OrderTracking({ order }: { order: Order }) {
  const status = getOrderStatus(order);
  const { from, to } = order.estimatedDelivery;

  return (
    <section className="rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3c5048]">Delivery update</p>
          <h2 className="mt-1 text-2xl font-medium text-black">{statusHeadline[status]}</h2>
          <p className="mt-1 text-sm text-[#6b6b63]">
            Estimated delivery {formatRange(from, to, "long")} via {order.carrier}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6b63]">Tracking number</p>
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-black underline underline-offset-4"
          >
            {order.trackingNumber}
          </a>
        </div>
      </div>

      <ol className="mt-8 grid grid-cols-5">
        {stepOrder.map((key, i) => {
          const at = order.timeline[key];
          const done = Boolean(at);
          const nextDone = i < stepOrder.length - 1 && Boolean(order.timeline[stepOrder[i + 1]]);
          const first = i === 0;
          const last = i === stepOrder.length - 1;

          return (
            <li key={key} className="flex flex-col items-center text-center">
              <div className="flex w-full items-center">
                <span className={`h-px flex-1 ${first ? "bg-transparent" : done ? "bg-[#3c5048]" : "bg-black/15"}`} />
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    done ? "border-[#3c5048] bg-[#3c5048] text-white" : "border-black/20 bg-white"
                  }`}
                >
                  {done && <CheckIcon size={14} />}
                </span>
                <span className={`h-px flex-1 ${last ? "bg-transparent" : nextDone ? "bg-[#3c5048]" : "bg-black/15"}`} />
              </div>

              <p className="mt-3 text-xs font-semibold text-black">{stepLabels[key]}</p>
              <p className="mt-1 break-words px-1 text-[11px] text-[#9a9a92]">
                {at ? formatShortDateTime(at) : `Expected ${formatRange(from, to, "short")}`}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}