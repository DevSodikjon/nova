import Image from "next/image";
import Link from "next/link";

const moods = [
  {
    title: "Soft tailoring",
    tag: "Ease, refined",
    href: "/shop?mood=soft-tailoring",
    image: "/images/mood-soft-tailoring.jpg",
    alt: "Woman in a cream tailored suit standing in an arched stone hallway",
  },
  {
    title: "Modern knitwear",
    tag: "Texture in motion",
    href: "/shop?mood=modern-knitwear",
    image: "/images/mood-modern-knitwear.jpg",
    alt: "Woman wearing a chunky brown knit sweater",
  },
  {
    title: "After dark",
    tag: "Precise silhouettes",
    href: "/shop?mood=after-dark",
    image: "/images/mood-after-dark.jpg",
    alt: "Woman in a black evening gown standing in an art gallery",
  },
];

export default function ShopByMood() {
  return (
    <section className="bg-[#f4f1ea] py-14 sm:py-20">
      <div className="container">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">Shop by mood</p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-light text-black">
              A wardrobe with room to breathe
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-black underline underline-offset-4 whitespace-nowrap"
          >
            Explore all categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moods.map((mood, i) => (
            <Link
              key={mood.title}
              href={mood.href}
              className={`
                group relative block aspect-[4/5] overflow-hidden rounded-md
                ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              `}
            >
              <Image
                src={mood.image}
                alt={mood.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-light">{mood.title}</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/85">
                  {mood.tag}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-6 flex sm:hidden items-center justify-center gap-2 text-sm font-medium text-black underline underline-offset-4"
        >
          Explore all categories
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}