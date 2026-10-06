"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-3">
      {images.length > 1 && (
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-sm ring-2 transition ${
                i === active ? "ring-black" : "ring-transparent hover:ring-black/20"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex-1 aspect-[4/5] overflow-hidden rounded-md">
        <Image
          src={images[active]}
          alt={`${alt} — image ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-sm bg-white px-2 py-1 text-xs font-medium text-black">
            {active + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}