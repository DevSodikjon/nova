import Image from "next/image";
import { notFound } from "next/navigation";
import { product } from "@/data/navigation";

export default async function productDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = product.find((p) => p.id === id);

  if (!item) notFound();

  return (
    <div className="bg-[#faf8f3] py-10 sm:py-16">
      <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {item.badge && (
            <span className="inline-block bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
              {item.badge}
            </span>
          )}

          <h1 className="mt-4 text-3xl sm:text-4xl font-light text-black">{item.name}</h1>
          <p className="mt-1 text-[#6b6b63]">{item.category}</p>

          <p className="mt-2 flex items-center gap-1 text-sm text-[#6b6b63]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="black" stroke="none">
              <path d="M12 2l2.9 6.9 7.1.6-5.4 4.6 1.7 7-6.3-4-6.3 4 1.7-7L2 9.5l7.1-.6L12 2z" />
            </svg>
            {item.rating.toFixed(1)} ({item.reviews} reviews)
          </p>

          <p className="mt-6 text-2xl font-semibold text-black">${item.price}</p>

          <button
            type="button"
            className="mt-8 w-full rounded-md bg-black py-3.5 text-sm font-medium text-white transition hover:bg-black/85 sm:w-auto sm:px-10"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

