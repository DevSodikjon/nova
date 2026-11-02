import Link from "next/link";
import CategoryCard from "@/components/Categories/CategoryCard";
// import ShopByMood from "@/components/ShopByMood/ShopByMood"; // yo'lni o'zingizdagiga moslang
import Newsletter from "@/sections/Home/newsLetter"; // yo'lni o'zingizdagiga moslang
import { getCategories, type CategoryGroup } from "@/lib/categories";

export const metadata = { title: "Shop by category — NOVA" };

const groups: CategoryGroup[] = ["Clothing", "Accessories"];

export default async function CategoriesPage() {
  const categories = await getCategories();
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      <div className="bg-[#faf8f3] py-8 sm:py-12">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="font-medium text-black">Categories</span>
          </nav>

          <div className="mt-6 flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">Browse</p>
              <h1 className="mt-2 text-4xl font-light text-black sm:text-5xl">Shop by category</h1>
              <p className="mt-2 text-[#6b6b63]">
                {total} considered pieces in {categories.length} categories
              </p>
            </div>
            <p className="max-w-sm text-sm text-[#6b6b63] lg:text-right">
              Start with what you need, then build outward. Every piece is designed to combine.
            </p>
          </div>

          {groups.map((group) => {
            const items = categories.filter((c) => c.group === group);
            if (items.length === 0) return null;

            return (
              <section key={group} className="mt-10">
                <h2 className="text-2xl font-light text-black">{group}</h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((c) => (
                    <CategoryCard key={c.name} category={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* <ShopByMood / */}
      {/* <Newsletter /> */}
    </>
  );
}