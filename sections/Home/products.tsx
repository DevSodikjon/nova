import Link from "next/link";
import ProductCard from "@/components/Cards/productCard";
import { product } from "@/data/navigation";

export default function Product() {
  return (
    <section className="bg-[#faf8f3] py-20 sm:py-20">
      <div className="container">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">Just in</p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light text-black">New arrivals</h2>
            <p className="mt-3 text-[#6b6b63]">Essential forms, fresh texture and a quiet shift in tone.</p>
          </div>

          <Link
            href="/shop?sort=new"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-black underline underline-offset-4 whitespace-nowrap"
          >
            Shop new arrivals
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
          {product.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <Link
          href="/shop?sort=new"
          className="mt-6 flex sm:hidden items-center justify-center gap-2 text-sm font-medium text-black underline underline-offset-4"
        >
          Shop new arrivals
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}