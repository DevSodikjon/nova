import Image from "next/image";
import Link from "next/link";

type WardrobeCardProps = {
  title: string;
  tag: string;
  href: string;
  image: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
};

export default function WardrobeCard({
  title,
  tag,
  href,
  image,
  alt,
  wide,
  tall,
}: WardrobeCardProps) {
  return (
    <Link
      href={href}
      className={`
        group grid grid-cols-1 grid-rows-1 overflow-hidden rounded-md
        aspect-[4/5]
        ${tall ? "lg:aspect-[4/6]" : ""}
        ${wide ? "sm:col-span-2 lg:col-span-1" : ""}
      `}
    >
      <Image
        src={image}
        alt={alt}
        width={800}
        height={1000}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="col-start-1 row-start-1 h-full w-full object-cover transition-transform ease-out group-hover:scale-105"
      />

      <div className="col-start-1 row-start-1 bg-gradient-to-t from-black/55 via-black/0 to-black/0 " />

      <div className="col-start-1 row-start-1 self-end p-6 text-white ">
        <h3 className="text-2xl font-light">{title}</h3>
        <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/85">
          {tag}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
