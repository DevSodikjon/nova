import type { Bindings } from "@/lib/checkout";
import CheckoutSection from "./CheckoutSection";
import Field, { CheckboxRow } from "./Field";

export default function ContactSection({ field, check }: Bindings) {
  return (
    <CheckoutSection
      number={1}
      title="Contact"
      right={
        <button
          type="button"
          onClick={() => document.getElementById("email")?.focus()}
          className="text-xs text-[#6b6b63] underline underline-offset-4"
        >
          Edit
        </button>
      }
    >
      <Field {...field("email")} label="Email address" type="email" inputMode="email" autoComplete="email" showCheck />
      <CheckboxRow {...check("newsletter")}>Email me order updates and private NOVA offers</CheckboxRow>
    </CheckoutSection>
  );
}