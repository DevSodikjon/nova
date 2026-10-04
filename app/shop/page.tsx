import Link from "next/link";
import ProductCard from "@/components/Cards/productCard";
import ShopFilters from "@/components/Shop/ShopFilters";
import ActiveFilters from "@/components/Shop/ActiveFilters";
import Pagination from "@/components/Shop/Pagination";
import { product } from "@/data/navigation";

const PER_PAGE = 9;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(product.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);

  const start = (current - 1) * PER_PAGE;
  const pageItems = product.slice(start, start + PER_PAGE);

  return (
    <div className="bg-[#faf8f3] py-8 sm:py-12">
      <div className="container">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <span className="font-medium text-black">All products</span>
        </nav>

        <div className="mt-6 flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">The collection</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-light text-black">Shop all</h1>
            <p className="mt-2 text-[#6b6b63]">{product.length} considered pieces</p>
          </div>
          <p className="max-w-sm text-sm text-[#6b6b63] lg:text-right">
            A modular wardrobe of refined essentials, designed for repeat wear and effortless combination.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ActiveFilters />
          <select
            defaultValue="featured"
            className="w-fit rounded-md border border-black/15 bg-white px-4 py-2 text-sm text-black outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="new">Sort: Newest</option>
            <option value="price-asc">Sort: Price, low to high</option>
            <option value="price-desc">Sort: Price, high to low</option>
          </select>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <ShopFilters />

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            <Pagination current={current} total={totalPages} basePath="/shop" />
          </div>
        </div>
      </div>
    </div>
  );
}