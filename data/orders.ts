export type StepKey = "placed" | "confirmed" | "prepared" | "in-transit" | "delivered";

export type OrderLine = {
  productId: string;
  color: string;
  size: string;
  qty: number;
  price: number; // buyurtma paytidagi bir dona narxi (nusxa)
};

export type Order = {
  id: string;
  placedAt: string; // "2026-09-29T10:42:00"
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: { from: string; to: string };
  returnEligibleUntil: string;
  timeline: Partial<Record<StepKey, string>>; // bosqich: qachon bo'lgani (yo'q bo'lsa, hali bo'lmagan)
  address: { name: string; street: string; city: string; state: string; zip: string; country: string };
  payment: { brand: string; last4: string; name: string; paidAt: string };
  lines: OrderLine[];
  shipping: number;
  tax: number;
};

export const orders: Order[] = [
  {
    id: "NVA-10482",
    placedAt: "2026-09-29T10:42:00",
    carrier: "UPS Ground",
    trackingNumber: "1Z8W32A90358192044",
    trackingUrl: "https://www.ups.com/track?tracknum=1Z8W32A90358192044",
    estimatedDelivery: { from: "2026-10-05", to: "2026-10-07" },
    returnEligibleUntil: "2026-10-31",
    timeline: {
      placed: "2026-09-29T10:42:00",
      confirmed: "2026-09-29T10:44:00",
      prepared: "2026-09-30T16:18:00",
      "in-transit": "2026-10-01T08:06:00",
    },
    address: {
      name: "Maya Chen",
      street: "42 Mercer Street",
      city: "New York",
      state: "NY",
      zip: "10013",
      country: "United States",
    },
    payment: { brand: "Visa", last4: "4242", name: "Maya Chen", paidAt: "2026-09-29T10:42:00" },
    lines: [
      { productId: "drape-column-dress", color: "Espresso", size: "M", qty: 1, price: 248 },
      { productId: "merino-rib-cardigan", color: "Oatmeal", size: "S", qty: 1, price: 168 },
      { productId: "loop-sculptural-cuff", color: "Silver", size: "One size", qty: 1, price: 118 },
    ],
    shipping: 0,
    tax: 42.72,
  },
];