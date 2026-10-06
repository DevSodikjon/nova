"use client";

import { useState } from "react";

export default function QuantityStepper() {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black"
      >
        −
      </button>
      <span className="w-4 text-center text-sm text-black">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => setQty((q) => q + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black"
      >
        +
      </button>
    </div>
  );
}