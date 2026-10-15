"use client";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

export default function QuantityStepper({ value, onChange, max = 99 }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black disabled:opacity-40"
      >
        −
      </button>
      <span className="w-4 text-center text-sm text-black">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}