import Link from "next/link";
import { notFound } from "next/navigation";
import { product, type Product } from "@/data/products";
import ProductGallery from "@/components/Products/ProductGallery";
import ProductPurchase from "@/components/Products/ProductPurchase";
import DetailsAccordion from "@/components/Products/DetailsAccordion";
import ProductCard from "@/components/Cards/productCard";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = product.find((p) => p.id === id);

  if (!item) notFound();

  const mainCategory = item.category.split("·")[0].trim();

  // 1) Qo'lda tanlangan to'plam
  const curated = (item.consideredTogether ?? [])
    .map((cid) => product.find((p) => p.id === cid))
    .filter((p): p is Product => Boolean(p));

  // 2) Zaxira: har bir boshqa kategoriyadan bittadan
  const seen = new Set<string>([mainCategory]);
  const fallback = product.filter((p) => {
    const cat = p.category.split("·")[0].trim();
    if (p.id === item.id || seen.has(cat)) return false;
    seen.add(cat);
    return true;
  });

  const related = (curated.length > 0 ? curated : fallback).slice(0, 4);

  return (
    <div className="bg-[#f4f1ea] py-8 sm:py-12">
      <div className="container">
        <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(mainCategory)}`} className="hover:text-black">
            {mainCategory}
          </Link>
          <span>/</span>
          <span className="font-medium text-black">{item.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={item.images} alt={item.alt} />

          <div>
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3c5048]">{item.category}</p>
              {item.badge && (
                <span className="bg-[#dfe8e2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#3c5048]">
                  {item.badge}
                </span>
              )}
            </div>

            <h1 className="mt-2 text-3xl font-light text-black sm:text-4xl">{item.name}</h1>
            <p className="mt-1 text-xl font-semibold text-black">${item.price}</p>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#6b6b63]">
              <span className="flex text-black">
                {"★".repeat(Math.round(item.rating))}
                <span className="text-black/20">{"★".repeat(5 - Math.round(item.rating))}</span>
              </span>
              <span className="underline underline-offset-4">
                {item.rating.toFixed(1)} · {item.reviews} reviews
              </span>
            </p>

            <p className="mt-4 max-w-md border-b border-black/10 pb-6 text-sm text-[#6b6b63]">{item.description}</p>

            <div className="mt-6">
              <ProductPurchase item={item} />
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-sm bg-[#dfe8e2] p-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3c5048" strokeWidth="2" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-5M12 8h.01" />
              </svg>
              <div>
                <p className="text-sm font-medium text-black">Complimentary delivery</p>
                <p className="text-sm text-[#6b6b63]">Free standard delivery and easy 30-day returns on this piece.</p>
              </div>
            </div>

            <div className="mt-6">
              <DetailsAccordion
                sections={[
                  { title: "Product details", content: item.details },
                  { title: "Delivery & returns", content: "Standard delivery in 3–5 business days. Free returns within 30 days." },
                  { title: "Care", content: "Dry clean only. Store on a padded hanger." },
                ]}
              />
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex items-end justify-between border-b border-black/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">Complete the look</p>
                <h2 className="mt-2 text-3xl font-light text-black sm:text-4xl">Considered together</h2>
              </div>
              <Link href="/shop" className="hidden text-sm font-medium text-black underline underline-offset-4 sm:inline">
                Shop the edit →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}