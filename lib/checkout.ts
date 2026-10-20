import { FREE_SHIPPING_THRESHOLD } from "@/lib/card";
import type { DeliveryId, DeliveryOption } from "@/data/checkout";

export type TextField =
  | "email" | "firstName" | "lastName" | "address" | "apartment" | "city" | "state" | "zip" | "phone"
  | "cardNumber" | "expiry" | "cvc" | "cardName";

export type BoolField = "newsletter" | "saveAddress" | "billingSame";

export type CheckoutData = Record<TextField, string> &
  Record<BoolField, boolean> & { delivery: DeliveryId };

export type Errors = Partial<Record<TextField, string>>;

export type PlacedOrder = { id: string; email: string; firstName: string; total: number };

// Bo'limlarga beriladigan "ulagichlar": maydon qiymati, o'zgartirish va xato
export type FieldBindings = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  valid: boolean;
};
export type CheckBindings = { checked: boolean; onChange: (value: boolean) => void };
export type Bindings = {
  field: (name: TextField) => FieldBindings;
  check: (name: BoolField) => CheckBindings;
};

// Formadagi tartib (birinchi xatoga fokus berish uchun)
export const fieldOrder: TextField[] = [
  "email", "firstName", "lastName", "address", "apartment", "city", "state", "zip", "phone",
  "cardNumber", "expiry", "cvc", "cardName",
];

const sectionFields: Record<"contact" | "shipping" | "payment", TextField[]> = {
  contact: ["email"],
  shipping: ["firstName", "lastName", "address", "city", "state", "zip", "phone"],
  payment: ["cardNumber", "expiry", "cvc", "cardName"],
};

// ---------- Formatlash ----------
const digits = (s: string) => s.replace(/\D/g, "");

export function formatCardNumber(v: string) {
  return digits(v).slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(v: string) {
  const d = digits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function formatValue(name: TextField, v: string) {
  if (name === "cardNumber") return formatCardNumber(v);
  if (name === "expiry") return formatExpiry(v);
  if (name === "cvc") return digits(v).slice(0, 4);
  return v;
}

// ---------- Tekshiruv ----------
function luhn(num: string) {
  let sum = 0;
  let double = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = Number(num[i]);
    if (double) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validate(d: CheckoutData): Errors {
  const e: Errors = {};

  if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = "Enter a valid email address";
  if (!d.firstName.trim()) e.firstName = "Enter your first name";
  if (!d.lastName.trim()) e.lastName = "Enter your last name";
  if (!d.address.trim()) e.address = "Enter your street address";
  if (!d.city.trim()) e.city = "Enter your city";
  if (!d.state.trim()) e.state = "Enter your state";
  if (!/^\d{5}(-\d{4})?$/.test(d.zip.trim())) e.zip = "Enter a valid ZIP code";
  if (digits(d.phone).length < 10) e.phone = "Enter a valid phone number";

  const card = digits(d.cardNumber);
  if (card.length < 13 || card.length > 19 || !luhn(card)) e.cardNumber = "Enter a valid card number";

  const m = /^(\d{2}) \/ (\d{2})$/.exec(d.expiry);
  if (!m) {
    e.expiry = "Use the format MM / YY";
  } else {
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    const now = new Date();
    const expired = year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
    if (month < 1 || month > 12 || expired) e.expiry = "Enter a valid expiry date";
  }

  if (!/^\d{3,4}$/.test(d.cvc)) e.cvc = "Enter the 3 or 4 digit code";
  if (!d.cardName.trim()) e.cardName = "Enter the name on the card";

  return e;
}

const complete = (fields: TextField[], e: Errors) => fields.every((f) => !e[f]);

export const isContactComplete = (e: Errors) => complete(sectionFields.contact, e);

// Tepadagi chiziqda qaysi bosqich "faol": birinchi to'ldirilmagan bo'lim
export function getActiveStep(e: Errors): number {
  if (!complete(sectionFields.contact, e)) return 0; // Contact
  if (!complete(sectionFields.shipping, e)) return 1; // Shipping
  if (!complete(sectionFields.payment, e)) return 3; // Payment (Delivery doim tanlangan)
  return 4; // Review
}

export const firstErrorField = (e: Errors) => fieldOrder.find((f) => e[f]);

// ---------- Yetkazib berish ----------
export function getShippingCost(option: DeliveryOption, subtotal: number) {
  if (option.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return option.price;
}

const shortDate = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

function inDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

export function deliveryText(option: DeliveryOption) {
  if (option.id === "next-day") return "Order by 1pm · Arrives tomorrow";
  const from = inDays(option.minDays);
  const to = inDays(option.maxDays);
  const sameMonth = from.getMonth() === to.getMonth();
  return `Arrives ${shortDate(from)}–${sameMonth ? to.getDate() : shortDate(to)}`;
}