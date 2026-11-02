import { orders, type Order, type StepKey } from "@/data/orders";

export const stepOrder: StepKey[] = ["placed", "confirmed", "prepared", "in-transit", "delivered"];

export const stepLabels: Record<StepKey, string> = {
  placed: "Order placed",
  confirmed: "Confirmed",
  prepared: "Prepared",
  "in-transit": "In transit",
  delivered: "Delivered",
};

export const statusBadge: Record<StepKey, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  prepared: "Preparing",
  "in-transit": "In transit",
  delivered: "Delivered",
};

export const statusHeadline: Record<StepKey, string> = {
  placed: "We've received your order",
  confirmed: "Your order is confirmed",
  prepared: "Your order is ready to ship",
  "in-transit": "On its way to you",
  delivered: "Your order has arrived",
};

// Backend tayyor bo'lganda faqat shu funksiyaning ichi fetch'ga almashadi
export async function getOrder(id: string): Promise<Order | undefined> {
  return orders.find((o) => o.id === id);
}

// Vaqti yozilgan oxirgi bosqich = hozirgi holat
export function getOrderStatus(order: Order): StepKey {
  let current: StepKey = "placed";
  for (const key of stepOrder) {
    if (order.timeline[key]) current = key;
  }
  return current;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getOrderTotals(order: Order) {
  const subtotal = round2(order.lines.reduce((sum, l) => sum + l.price * l.qty, 0));
  const total = round2(subtotal + order.shipping + order.tax);
  return { subtotal, shipping: order.shipping, tax: order.tax, total };
}

// ---------- Sana formatlari ----------
// "2026-10-05" ni UTC emas, mahalliy sana sifatida o'qiydi (kun siljib ketmasligi uchun)
const parseLocal = (s: string) => new Date(s.length === 10 ? `${s}T00:00:00` : s);

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  parseLocal(iso).toLocaleDateString("en-US", opts);

export const formatTime = (iso: string) =>
  parseLocal(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const formatLongDateTime = (iso: string) =>
  `${formatDate(iso, { month: "long", day: "numeric", year: "numeric" })} · ${formatTime(iso)}`;

export const formatShortDateTime = (iso: string) =>
  `${formatDate(iso, { month: "short", day: "numeric" })} · ${formatTime(iso)}`;

// "October 5–7" yoki "Oct 5–7"
export function formatRange(from: string, to: string, month: "long" | "short") {
  const a = parseLocal(from);
  const b = parseLocal(to);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month, day: "numeric" });
  if (from === to) return fmt(a);
  return a.getMonth() === b.getMonth() ? `${fmt(a)}–${b.getDate()}` : `${fmt(a)} – ${fmt(b)}`;
}

// Backend tayyor bo'lganda bu ham fetch'ga almashadi. Yangisi tepada.
export async function getOrders(): Promise<Order[]> {
  return [...orders].sort((a, b) => b.placedAt.localeCompare(a.placedAt));
}