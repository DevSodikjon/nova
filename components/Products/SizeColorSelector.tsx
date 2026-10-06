"use client";

import { useState, useMemo } from "react";
import type { Variant } from "@/data/products";

type SizeColorSelectorProps = {
  variants: Variant[];
};

export default function SizeColorSelector({ variants }: SizeColorSelectorProps) {
  const colors = useMemo(() => {
    const seen = new Map<string, string>();
    variants.forEach((v) => seen.set(v.color, v.colorHex));
    return Array.from(seen, ([name, hex]) => ({ name, hex }));
  }, [variants]);

  const [activeColor, setActiveColor] = useState(colors[0]?.name ?? "");
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const sizesForColor = useMemo(
    () => variants.filter((v) => v.color === activeColor),
    [variants, activeColor]
  );

  return (
    <div className="flex flex-col gap-6">
      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-black">
              Color: <span className="font-medium">{activeColor}</span>
            </p>
            <span className="text-sm text-[#9a9a92]">{colors.length} colors</span>
          </div>
          <div className="mt-3 flex gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-label={c.name}
                onClick={() => {
                  setActiveColor(c.name);
                  setActiveSize(null);
                }}
                className={`h-8 w-8 border rounded-full ring-2 ring-offset-2 transition ${
                  activeColor === c.name ? "ring-black" : "ring-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-black">Select size</p>
          <button type="button" className="text-sm text-black underline underline-offset-4">
            Size guide
          </button>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {sizesForColor.map((v) => {
            const outOfStock = v.stock === 0;
            return (
              <button
                key={v.size}
                type="button"
                disabled={outOfStock}
                onClick={() => setActiveSize(v.size)}
                className={`rounded-md border py-2.5 text-sm ${
                  outOfStock
                    ? "cursor-not-allowed border-black/10 text-black/30 line-through"
                    : activeSize === v.size
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black"
                }`}
              >
                {v.size}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-[#9a9a92]">Fits true to size. Maya is 5'10" and wears size S.</p>
      </div>
    </div>
  );
}