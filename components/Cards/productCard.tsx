import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import WishlistButton from "./WishlistButton";

type ProductCardProps = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  alt: string;
  badge?: String;
  stockStatus?: string;
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  rating,
  reviews,
  images,
  alt,
  badge,
  stockStatus,
}: ProductCardProps) {

  return (
    <div className="w-full" >
      <div className="relative">
    <Link
      href={`/productDetails/${id}`}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-md"
    >
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {badge && (
        <span className="absolute left-3 top-3 z-10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
          {badge}
        </span>
      )}
    </Link>

    <WishlistButton productId={id} />
  </div>

      <p className="text-sm text-[#6b6b63]">{category}</p>

    <p className="mt-1 flex items-center justify-between text-sm text-[#6b6b63]">
  <span className="flex items-center gap-1">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="none">
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.6 1.7 7-6.3-4-6.3 4 1.7-7L2 9.5l7.1-.6L12 2z" />
    </svg>
    {rating.toFixed(1)} ({reviews})
  </span>
  {stockStatus && (
    <span className={stockStatus === "Low stock" ? "text-[#8a6d1f]" : "text-[#3c5048]"}>
      {stockStatus}
    </span>
  )}
</p>
    </div>
  );
}