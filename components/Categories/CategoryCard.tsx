import Image from "next/image";
import Link from "next/link";
import type { CategoryInfo } from "@/lib/categories";

export default function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-md"
    >
      <Image
        src={category.cover}
        alt={`${category.name} collection`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-light">{category.name}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/85">
          {category.count} {category.count === 1 ? "piece" : "pieces"} →
        </span>
      </div>
    </Link>
  );
}