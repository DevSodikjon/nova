import { product, type Product, type Variant } from "@/data/products";
import type { CartItem } from "@/context/shopContext";

export const TAX_RATE = 0.08;               // 8% soliq (Figma: $534 → $42.72)
export const FREE_SHIPPING_THRESHOLD = 150; // shundan oshsa yetkazish bepul
export const SHIPPING_FEE = 15;             // oshmasa shuncha to'lanadi

export type CartLine = {
  item: CartItem;           // savatdagi qator (id, rang, o'lcham, miqdor)
  product: Product;         // products.ts dagi to'liq mahsulot
  variant: Variant | undefined; // shu rang+o'lchamning zaxirasi
  lineTotal: number;        // narx × miqdor
};

export type CartTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

// $248 yoki $42.72: butun son bo'lsa kasrsiz
export const money = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

export function buildCartLines(cart: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];

  for (const item of cart) {
    const p = product.find((x) => x.id === item.productId);
    if (!p) continue; // mahsulot topilmasa (o'chirilgan bo'lsa) o'tkazib yuboradi

    const variant = p.variants.find((v) => v.color === item.color && v.size === item.size);
    lines.push({ item, product: p, variant, lineTotal: round2(p.price * item.qty) });
  }

  return lines;
}

export function getCartTotals(lines: CartLine[]): CartTotals {
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0));
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + shipping + tax);
  return { subtotal, shipping, tax, total };
}