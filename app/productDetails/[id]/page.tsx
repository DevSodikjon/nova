import Link from "next/link";
import { notFound } from "next/navigation";
import { product } from "@/data/products";
import ProductGallery from "@/components/Products/ProductGallery";
import SizeColorSelector from "@/components/Products/SizeColorSelector";
import QuantityStepper from "@/components/Products/QuantityStepper";
import DetailsAccordion from "@/components/Products/DetailsAccordion";
import ProductCard from "@/components/Cards/productCard";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = product.find((p) => p.id === id);

  if (!item) notFound();

  // const related = product.filter((p) => p.id !== item.id).slice(0, 4);
  const related = product.filter(
  (p) => p.name === item.name
);

  return (
    <div className="bg-[#faf8f3] py-8 sm:py-12">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#6b6b63]">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">
            {item.category.split("·")[0].trim()}
          </Link>
          <span>/</span>
          <span className="font-medium text-black">{item.name}</span>
        </nav>

        {/* Gallery + info */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={item.images} alt={item.alt} />

          <div>
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
                {item.category}
              </p>
              {item.badge && (
                <span className="bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {item.badge}
                </span>
              )}
            </div>

            <h1 className="mt-2 text-3xl sm:text-4xl font-light text-black">
              {item.name}
            </h1>
            <p className="mt-1 text-xl font-semibold text-black">
              ${item.price}
            </p>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-[#6b6b63]">
              <span className="flex text-black">
                {"★".repeat(Math.round(item.rating))}
                <span className="text-black/20">
                  {"★".repeat(5 - Math.round(item.rating))}
                </span>
              </span>
              <a href="#reviews" className="underline underline-offset-4">
                {item.rating.toFixed(1)} · {item.reviews} reviews
              </a>
            </p>

            <p className="mt-4 max-w-md border-b border-black/10 pb-6 text-sm text-[#6b6b63]">
              {item.description ??
                "A considered piece designed for everyday wear, cut from quality materials with clean, lasting lines."}
            </p>

            <div className="mt-6">
            <SizeColorSelector variants={item.variants} />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <QuantityStepper />
              <p className="flex items-center gap-1.5 text-sm text-[#6b6b63]">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                In stock · ships in 1–2 days
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/85"
              >
                Add to cart
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 8h12l1 13H5L6 8Z" />
                  <path d="M9 9V6a3 3 0 0 1 6 0v3" />
                </svg>
              </button>

              <button
                type="button"
                className="rounded-md border border-black py-3.5 text-sm font-medium text-black transition hover:bg-black/5"
              >
                Buy now
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 text-sm text-black"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                >
                  <path d="M20.84 8.61C20.84 5.61 18.62 3.5 15.85 3.5C14.2 3.5 12.72 4.3 12 5.55C11.28 4.3 9.8 3.5 8.15 3.5C5.38 3.5 3.16 5.61 3.16 8.61C3.16 12.38 6.72 15.42 12 20.5C17.28 15.42 20.84 12.38 20.84 8.61Z" />
                </svg>
                Add to wishlist
              </button>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-md bg-[#eef1ee] p-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3c5048"
                strokeWidth="2"
                className="mt-0.5 shrink-0"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 16v-5M12 8h.01" />
              </svg>
              <div>
                <p className="text-sm font-medium text-black">
                  Complimentary delivery
                </p>
                <p className="text-sm text-[#6b6b63]">
                  Free standard delivery and easy 30-day returns on this piece.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <DetailsAccordion
                sections={[
                  {
                    title: "Product details",
                    content: item.details ?? "Details available soon.",
                  },
                  {
                    title: "Delivery & returns",
                    content:
                      "Standard delivery in 3–5 business days. Free returns within 30 days.",
                  },
                  {
                    title: "Care",
                    content: "Dry clean only. Store on a padded hanger.",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex items-end justify-between border-b border-black/10 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">
                  Complete the look
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-light text-black">
                  Considered together
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline text-sm font-medium text-black underline underline-offset-4"
              >
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
