export type Category = { name: string; count: number };
export type Color = { name: string; hex: string };

export const categories: Category[] = [
  { name: "All clothing", count: 126 },
  { name: "Dresses", count: 24 },
  { name: "Knitwear", count: 31 },
  { name: "Tops & shirts", count: 28 },
  { name: "Trousers", count: 19 },
  { name: "Outerwear", count: 14 },
];

export const sizes: string[] = ["XS", "S", "M", "L", "XL", "0", "2", "4"];

export const colors: Color[] = [
  { name: "Ink", hex: "#1c1c1a" },
  { name: "Chalk", hex: "#e9e5db" },
  { name: "Mineral", hex: "#3c5048" },
  { name: "Cocoa", hex: "#6b4a37" },
  { name: "Olive", hex: "#6b6b4a" },
  { name: "Clay", hex: "#a66b4a" },
];