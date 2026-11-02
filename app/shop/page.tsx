import Link from "next/link";
import ProductCard from "@/components/Cards/productCard";
import ShopFilters from "@/components/Shop/ShopFilters";
import ActiveFilters from "@/components/Shop/ActiveFilters";
import Pagination from "@/components/Shop/Pagination";
import { product } from "@/data/products";
import { categoryOf, getCategories } from "@/lib/categories";

const PER_PAGE = 9;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category } = await searchParams;

  const categories = await getCategories();
  // Noto'g'ri nom yozilsa (masalan ?category=xyz), filtr ishlamaydi va hammasi chiqadi
  const activeCategory = categories.find((c) => c.name === category)?.name;

  const filtered = activeCategory
    ? product.filter((p) => categoryOf(p) === activeCategory)
    : product;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (current - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="bg-[#faf8f3] py-8 sm:py-12 ">
      <div className="container">
        <div className="">
          <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-black">
              Shop
            </Link>
            <span>/</span>
            <span className="font-medium text-black">
              {activeCategory ?? "All products"}
            </span>
          </nav>

          <div className="mt-6 flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
                The collection
              </p>
              <h1 className="mt-2 text-4xl sm:text-5xl font-light text-black">
                {activeCategory ?? "Shop all"}
              </h1>
              <p className="mt-2 text-[#6b6b63]">
                {filtered.length} considered pieces
              </p>
            </div>
            <p className="max-w-sm text-sm text-[#6b6b63] lg:text-right">
              A modular wardrobe of refined essentials, designed for repeat wear
              and effortless combination.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 ">
          <ShopFilters
            categories={categories}
            total={product.length}
            activeCategory={activeCategory}
          />

          <div className="flex-1">
            <div className="mb-6 flex sm:justify-end gap-4 sm:flex-row sm:items-center sm:justify-between ">
              <select
                defaultValue="featured"
                className="w-fit rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="new">Sort: Newest</option>
                <option value="price-asc">Sort: Price, low to high</option>
                <option value="price-desc">Sort: Price, high to low</option>
              </select>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>

            <Pagination
              current={current}
              total={totalPages}
              basePath={
                activeCategory
                  ? `/shop?category=${encodeURIComponent(activeCategory)}`
                  : "/shop"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
