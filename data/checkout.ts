import { SHIPPING_FEE } from "@/lib/card";

export type DeliveryId = "standard" | "express" | "next-day";

export type DeliveryOption = {
  id: DeliveryId;
  label: string;
  price: number; // standard uchun: bepul chegaradan past bo'lganda to'lanadigan summa
  minDays: number;
  maxDays: number;
};

export const deliveryOptions: DeliveryOption[] = [
  { id: "standard", label: "Standard delivery", price: SHIPPING_FEE, minDays: 5, maxDays: 7 },
  { id: "express", label: "Express delivery", price: 18, minDays: 2, maxDays: 3 },
  { id: "next-day", label: "Next-day delivery", price: 28, minDays: 1, maxDays: 1 },
];