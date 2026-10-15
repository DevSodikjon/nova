"use client";

import { useMemo } from "react";
import type { Variant } from "@/data/products";

type SizeColorSelectorProps = {
  variants: Variant[];
  color: string;
  size: string | null;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
};

export default function SizeColorSelector({
  variants,
  color,
  size,
  onColorChange,
  onSizeChange,
}: SizeColorSelectorProps) {
  const colors = useMemo(() => {
    const seen = new Map<string, string>();
    variants.forEach((v) => seen.set(v.color, v.colorHex));
    return Array.from(seen, ([name, hex]) => ({ name, hex }));
  }, [variants]);

  const sizes = variants.filter((v) => v.color === color);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-black">
            Color: <span className="font-medium">{color}</span>
          </p>
          <span className="text-sm text-[#9a9a92]">{colors.length} colors</span>
        </div>
        <div className="mt-3 flex gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => onColorChange(c.name)}
              className={`h-8 w-8 rounded-full ring-2 ring-offset-2 transition ${
                color === c.name ? "ring-black" : "ring-transparent"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-black">Select size</p>
          <button type="button" className="text-sm text-black underline underline-offset-4">
            Size guide
          </button>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {sizes.map((v) => {
            const out = v.stock === 0;
            return (
              <button
                key={v.size}
                type="button"
                disabled={out}
                onClick={() => onSizeChange(v.size)}
                className={`rounded-md border py-2.5 text-sm ${
                  out
                    ? "cursor-not-allowed border-black/10 text-black/30 line-through"
                    : size === v.size
                    ? "border-black bg-black text-white"
                    : "border-black/15 text-black"
                }`}
              >
                {v.size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}