

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
  consideredTogether?: string[];
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
      "/Images/Products/Drape/Product_Drape.svg",
      "/Images/Products/Drape/Product_Drape_1.svg",
      "/Images/Products/Drape/Product_Drape_2.svg",
      "/Images/Products/Drape/Product_Drape_3.svg",
      "/Images/Products/Drape/Product_Drape_4.svg",
    ],
    consideredTogether: [
      "form-cotton-shirt",
      "arc-tailored-trouser",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    category: "Outerwear · Mineral",
    price: 398,
    rating: 5,
    reviews: 19,
    images: [
      "/Images/Products/Sculpted/Product_Sculpted.svg",
      "/Images/Products/Sculpted/Product_Sculpted_1.jpeg",
      "/Images/Products/Sculpted/Product_Sculpted_2.jpeg",
      "/Images/Products/Sculpted/Product_Sculpted_3.jpeg",
    ],
    consideredTogether: [
      "arc-tailored-trouser",
      "fine-cashmere-crew",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
      { color: "Grey", colorHex: "#BFBFBF", size: "XL", stock: 5 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XS", stock: 1 },
      { color: "Navy", colorHex: "#1c2a3a", size: "S", stock: 6 },
      { color: "Navy", colorHex: "#1c2a3a", size: "M", stock: 4 },
      { color: "Navy", colorHex: "#1c2a3a", size: "L", stock: 3 },
      { color: "Navy", colorHex: "#1c2a3a", size: "XL", stock: 2 },
      { color: "White", colorHex: "#ffffff", size: "XL", stock: 2 },
    ],
  },
  {
    name: "Arc Tailored Trouser",
    category: "Trousers · Graphite",
    price: 189,
    rating: 4.7,
    reviews: 38,
    images: [
      "/Images/Products/Arc/Product_Arc.svg",
      "/Images/Products/Arc/Product_Arc_1.jpeg",
      "/Images/Products/Arc/Product_Arc_2.jpeg",
      "/Images/Products/Arc/Product_Arc_3.jpeg",
    ],
    consideredTogether: [
      "form-cotton-shirt",
      "merino-rib-cardigan",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
      { color: "Dark Grey", colorHex: "#636363", size: "XL", stock: 2 },
    ],
  },
  {
    name: "Merino Rib Cardigan",
    category: "Knitwear · Oatmeal",
    price: 168,
    rating: 4.8,
    reviews: 61,
    images: [
      "/Images/Products/Merino/Product_Merino.svg",
      "/Images/Products/Merino/Product_Merino_1.jpeg",
      "/Images/Products/Merino/Product_Merino_2.jpeg",
      "/Images/Products/Merino/Product_Merino_3.jpeg",
    ],
    consideredTogether: [
      "arc-tailored-trouser",
      "contour-knit-tank",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Bias Satin Skirt",
    category: "Skirts · Olive",
    price: 158,
    rating: 4.9,
    reviews: 27,
    images: [
      "/Images/Products/Bias_Skirt/Product_Bias_Skirt.svg",
      "/Images/Products/Bias_Skirt/Product_Bias_Skirt_1.jpeg",
      "/Images/Products/Bias_Skirt/Product_Bias_Skirt_2.jpeg",
      "/Images/Products/Bias_Skirt/Product_Bias_Skirt_3.jpeg",
      "/Images/Products/Bias_Skirt/Product_Bias_Skirt_4.jpeg",
    ],
    consideredTogether: [
      "fine-cashmere-crew",
      "relaxed-twill-jacket",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Form Cotton Shirt",
    category: "Shirts · Chalk",
    price: 139,
    rating: 4.9,
    reviews: 27,
    images: [
      "/Images/Products/Cotton_Shirt/Product_Cotton_Shirt.svg",
      "/Images/Products/Cotton_Shirt/Product_Cotton_Shirt_1.jpeg",
      "/Images/Products/Cotton_Shirt/Product_Cotton_Shirt_2.jpeg",
      "/Images/Products/Cotton_Shirt/Product_Cotton_Shirt_3.jpeg",
    ],
    consideredTogether: [
      "arc-tailored-trouser",
      "bias-satin-skirt",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Contour Knit Tank",
    category: "Tops · Cocoa",
    price: 98,
    rating: 4.7,
    reviews: 33,
    images: [
      "/Images/Products/Knit_Tank/Product_Knit_Tank.svg",
      "/Images/Products/Knit_Tank/Product_Knit_Tank_1.jpeg",
      "/Images/Products/Knit_Tank/Product_Knit_Tank_2.jpeg",
      "/Images/Products/Knit_Tank/Product_Knit_Tank_3.jpeg",
    ],
    consideredTogether: [
      "arc-tailored-trouser",
      "relaxed-twill-jacket",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Relaxed Twill Jacket",
    category: "Jackets · Sand",
    price: 279,
    rating: 4.8,
    reviews: 24,
    images: [
      "/Images/Products/Twill_Jacket/Product_Twill_Jacket.svg",
      "/Images/Products/Twill_Jacket/Product_Twill_Jacket_3.jpeg",
      "/Images/Products/Twill_Jacket/Product_Twill_Jacket_4.jpeg",
      "/Images/Products/Twill_Jacket/Product_Twill_Jacket_5.jpeg",
    ],
    consideredTogether: [
      "contour-knit-tank",
      "arc-tailored-trouser",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Fine Cashmere Crew",
    category: "Knitwear · Ink",
    price: 218,
    rating: 4.9,
    reviews: 72,
    images: [
      "/Images/Products/Cashmere/Product_Cashmere.svg",
      "/Images/Products/Cashmere/Product_Cashmere_1.jpeg",
      "/Images/Products/Cashmere/Product_Cashmere_2.jpeg",
      "/Images/Products/Cashmere/Product_Cashmere_3.jpeg",
      "/Images/Products/Cashmere/Product_Cashmere_4.jpeg",
    ],
    consideredTogether: [
      "arc-tailored-trouser",
      "bias-satin-skirt",
      "veil-leather-slingback",
      "loop-sculptural-cuff",
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
    name: "Veil Leather Slingback",
    category: "Shoes · Black",
    price: 229,
    rating: 4.8,
    reviews: 31,
    images: [
      "/Images/Products/Slingback/Product_Slingback.svg",
      "/Images/Products/Slingback/Product_Slingback_1.jpeg",
      "/Images/Products/Slingback/Product_Slingback_2.jpeg",
      "/Images/Products/Slingback/Product_Slingback_3.jpeg",
    ],
    consideredTogether: [
      "drape-column-dress",
      "arc-tailored-trouser",
      "bias-satin-skirt",
      "loop-sculptural-cuff",
    ],
    alt: "Black leather slingback heels on a travertine stone slab",
    description:
      "A pointed slingback on a low block heel, cut from smooth Italian leather. The adjustable ankle strap keeps the line clean from desk to dinner.",
    details:
      "Smooth leather · Leather lining · 5 cm block heel · Made in Italy",
    variants: [
      { color: "Black", colorHex: "#1c1c1a", size: "36", stock: 2 },
      { color: "Black", colorHex: "#1c1c1a", size: "37", stock: 4 },
      { color: "Black", colorHex: "#1c1c1a", size: "38", stock: 6 },
      { color: "Black", colorHex: "#1c1c1a", size: "39", stock: 3 },
      { color: "Black", colorHex: "#1c1c1a", size: "40", stock: 0 },
      { color: "Black", colorHex: "#1c1c1a", size: "41", stock: 1 },
      { color: "Tan", colorHex: "#b08968", size: "36", stock: 1 },
      { color: "Tan", colorHex: "#b08968", size: "37", stock: 3 },
      { color: "Tan", colorHex: "#b08968", size: "38", stock: 5 },
      { color: "Tan", colorHex: "#b08968", size: "39", stock: 2 },
      { color: "Tan", colorHex: "#b08968", size: "40", stock: 2 },
      { color: "Tan", colorHex: "#b08968", size: "41", stock: 0 },
    ],
  },
  {
    name: "Loop Sculptural Cuff",
    category: "Jewelry · Silver",
    price: 118,
    rating: 4.9,
    reviews: 16,
    images: [
      "/Images/Products/Cuff/Product_Cuff.svg",
      "/Images/Products/Cuff/Product_Cuff_1.jpeg",
      "/Images/Products/Cuff/Product_Cuff_2.jpeg",
      "/Images/Products/Cuff/Product_Cuff_3.jpeg",
    ],
    consideredTogether: [
      "drape-column-dress",
      "form-cotton-shirt",
      "merino-rib-cardigan",
      "veil-leather-slingback",
    ],
    alt: "Sculptural silver cuff bracelet resting on a stone slab",
    description:
      "A single sweeping band of polished silver, shaped to sit lightly on the wrist. Wear it alone or stacked with a fine watch.",
    details: "Recycled sterling silver · Polished finish · Made in Spain",
    variants: [
      { color: "Silver", colorHex: "#c0c0c0", size: "One size", stock: 8 },
    ],
  },
  // ...qolgan mahsulotlarni ham shu tuzilmada yozing
];

export const product: Product[] = rawProducts.map((p) => ({
  id: slugify(p.name),
  ...p,

}));
if (process.env.NODE_ENV !== "production") {
  const ids = new Set(product.map((p) => p.id));
  product.forEach((p) => {
    p.consideredTogether?.forEach((id) => {
      if (!ids.has(id)) console.warn(`${p.name}: "${id}" mahsuloti topilmadi`);
    });
  });
}
