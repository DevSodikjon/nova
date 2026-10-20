import type { ReactNode } from "react";
import type { CheckBindings, FieldBindings } from "@/lib/checkout";
import { CheckCircleIcon } from "./icons";

type FieldProps = FieldBindings & {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  showCheck?: boolean; // to'g'ri bo'lganda yashil check ko'rsatadimi
};

export default function Field({
  id, label, value, onChange, onBlur, error, valid,
  type = "text", placeholder, autoComplete, inputMode, showCheck,
}: FieldProps) {
  const border = error
    ? "border-red-600"
    : valid && showCheck
    ? "border-[#3c5048]"
    : "border-black/15 focus-within:border-black";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-black">
        {label}
      </label>

      <div className={`flex items-center gap-2 rounded-sm border bg-white px-4 ${border}`}>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#9a9a92]"
        />
        {showCheck && valid && !error && (
          <span className="text-[#3c5048]">
            <CheckCircleIcon />
          </span>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxRow({ checked, onChange, children }: CheckBindings & { children: ReactNode }) {
  return (
    <label className="flex items-center gap-3 text-xs text-[#6b6b63]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#3c5048]"
      />
      {children}
    </label>
  );
}