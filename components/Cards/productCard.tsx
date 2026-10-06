import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

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
}: ProductCardProps) {

  return (
    <div className="w-full" >
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

        <span
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
            <path d="M20.84 8.61C20.84 5.61 18.62 3.5 15.85 3.5C14.2 3.5 12.72 4.3 12 5.55C11.28 4.3 9.8 3.5 8.15 3.5C5.38 3.5 3.16 5.61 3.16 8.61C3.16 12.38 6.72 15.42 12 20.5C17.28 15.42 20.84 12.38 20.84 8.61Z" />
          </svg>
        </span>
      </Link>

      <Link href={`/productDetails/${id}`} className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-black">{name}</h3>
        <span className="whitespace-nowrap text-sm font-semibold text-black">${price}</span>
      </Link>

      <p className="text-sm text-[#6b6b63]">{category}</p>

      <p className="mt-1 flex items-center gap-1 text-sm text-[#6b6b63]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="none">
          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.6 1.7 7-6.3-4-6.3 4 1.7-7L2 9.5l7.1-.6L12 2z" />
        </svg>
        {rating.toFixed(1)} ({reviews})
      </p>
    </div>
  );
}