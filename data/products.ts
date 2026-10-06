export type Variant = {
  color: string;
  colorHex: string;
  size: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  alt: string;
  badge?: string;
  description: string;
  details: string;
  variants: Variant[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const rawProducts: Omit<Product, "id">[] = [
  {
    name: "Drape Column Dress",
    category: "Dresses · New season",
    price: 248,
    rating: 4.9,
    reviews: 38,
    images: [
      "/Images/Products/Product_Image_1.svg",
      "/Images/Products/Product_Image_2.svg",
      "/Images/Products/Product_Image_3.svg",
    ],
    alt: "Woman wearing a brown draped column dress",
    badge: "New",
    description:
      "A fluid column silhouette with a softly draped waist and clean bateau neckline. Cut in matte crepe for movement without cling—an effortless study in line.",
    details: "Matte crepe · Lined through body · Made in Portugal",
    variants: [
      { color: "Espresso", colorHex: "#4a3a30", size: "XS", stock: 2 },
      { color: "Espresso", colorHex: "#4a3a30", size: "S", stock: 5 },
      { color: "Espresso", colorHex: "#4a3a30", size: "M", stock: 0 },
      { color: "Espresso", colorHex: "#4a3a30", size: "L", stock: 3 },
      { color: "Espresso", colorHex: "#4a3a30", size: "XL", stock: 4 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XS", stock: 1 },
      { color: "Navy", colorHex: "#1c2a3a", size: "S", stock: 6 },
      { color: "Navy", colorHex: "#1c2a3a", size: "M", stock: 4 },
      { color: "Navy", colorHex: "#1c2a3a", size: "L", stock: 3 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XL", stock: 2 },
      { color: "White", colorHex: "#ffffff", size: "XL", stock: 2 },
    ],
  },
  {
    name: "Sculpted Wool Coat",
    category: "Dresses · New season",
    price: 248,
    rating: 4.9,
    reviews: 38,
    images: [
      "/Images/Products/Product_Image_1.svg",
      "/Images/Products/Product_Image_2.svg",
      "/Images/Products/Product_Image_3.svg",
    ],
    alt: "Woman wearing a brown draped column dress",
    badge: "New",
    description:
      "A fluid column silhouette with a softly draped waist and clean bateau neckline. Cut in matte crepe for movement without cling—an effortless study in line.",
    details: "Matte crepe · Lined through body · Made in Portugal",
    variants: [
      { color: "Espresso", colorHex: "#4a3a30", size: "XS", stock: 2 },
      { color: "Espresso", colorHex: "#4a3a30", size: "S", stock: 5 },
      { color: "Espresso", colorHex: "#4a3a30", size: "M", stock: 0 },
      { color: "Espresso", colorHex: "#4a3a30", size: "L", stock: 3 },
      { color: "Espresso", colorHex: "#4a3a30", size: "XL", stock: 4 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XS", stock: 1 },
      { color: "Navy", colorHex: "#1c2a3a", size: "S", stock: 6 },
      { color: "Navy", colorHex: "#1c2a3a", size: "M", stock: 4 },
      { color: "Navy", colorHex: "#1c2a3a", size: "L", stock: 3 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XL", stock: 2 },
      { color: "White", colorHex: "#ffffff", size: "XL", stock: 2 },
    ],
  },
  // ...qolgan mahsulotlarni ham shu tuzilmada yozing
];

export const product: Product[] = rawProducts.map((p) => ({
  id: slugify(p.name),
  ...p,
}));