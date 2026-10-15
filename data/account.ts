import { product } from "./products";

export const accountStats = [
  { key: "orders", label: "Active orders", value: 2, note: "Arriving Oct 5–7" },
  { key: "saved", label: "Saved pieces", value: 7, note: "2 low in stock" },
  { key: "addresses", label: "Saved addresses", value: 2, note: "New York · Brooklyn" },
] as const;

export const accountProfile = {
  phone: "(917) 555-0138",
  preferredSize: "S / US 4",
};

export const defaultAddress = {
  label: "Home",
  name: "Maya Chen",
  street: "42 Mercer Street",
  city: "New York, NY 10013",
  country: "United States",
  phone: "(917) 555-0138",
};

// export const wishlistIds = product.slice(0, 7).map((p) => p.id);

// export const savedPieces = wishlistIds.slice(0, 3);

export const recentOrder = {
  id: "NVA-10482",
  status: "In transit",
  placedAt: "Sep 29, 2026",
  delivery: "Oct 5–7",
  total: 576.72,
  items: product.slice(0, 3).map((p) => p.id),
};