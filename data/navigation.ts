import { TRUE } from "sass";

export const headerLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
];

export const footerLinks = {
  shop: [
    { name: "New arrivals", href: "/shop/new-arrivals" },
    { name: "Clothing", href: "/shop/clothing" },
    { name: "Knitwear", href: "/shop/knitwear" },
    { name: "Accessories", href: "/shop/accessories" },
    { name: "The edit", href: "/shop/the-edit" },
  ],

  service: [
    { name: "Contact us", href: "/contact" },
    { name: "Delivery & returns", href: "/delivery-returns" },
    { name: "Size guide", href: "/size-guide" },
    { name: "Care guide", href: "/care-guide" },
    { name: "Track order", href: "/track-order" },
  ],

  about: [
    { name: "Our story", href: "/about/our-story" },
    { name: "Materials", href: "/about/materials" },
    { name: "Journal", href: "/journal" },
    { name: "Stores", href: "/stores" },
    { name: "Careers", href: "/careers" },
  ],
};

export const moods = [
  {
    title: "Soft tailoring",
    tag: "Ease, refined",
    href: "/categories",
    image: "/Images/WardrobeCard.svg",
    alt: "Woman in a cream tailored suit standing in an arched stone hallway",
    wide: true,
  },
  {
    title: "Modern knitwear",
    tag: "Texture in motion",
    href: "/categories",
      image: "/Images/WardrobeCard.svg",
    alt: "Woman wearing a chunky brown knit sweater",
   tall: true,
  },
  {
    title: "After dark",
    tag: "Precise silhouettes",
    href: "/categories",
      image: "/Images/WardrobeCard.svg",
    alt: "Woman in a black evening gown standing in an art gallery",
  },
];