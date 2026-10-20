import type { Bindings } from "@/lib/checkout";
import CheckoutSection from "./CheckoutSection";
import Field, { CheckboxRow } from "./Field";

export default function ShippingSection({ field, check }: Bindings) {
  return (
    <CheckoutSection
      number={2}
      title="Shipping address"
      right={<span className="hidden text-xs text-[#6b6b63] sm:inline">All fields required unless noted</span>}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field {...field("firstName")} label="First name" autoComplete="given-name" showCheck />
        <Field {...field("lastName")} label="Last name" autoComplete="family-name" showCheck />
      </div>

      <Field {...field("address")} label="Address" autoComplete="address-line1" showCheck />
      <Field
        {...field("apartment")}
        label="Apartment, suite, etc. (optional)"
        placeholder="Apartment or unit"
        autoComplete="address-line2"
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field {...field("city")} label="City" autoComplete="address-level2" />
        <Field {...field("state")} label="State" autoComplete="address-level1" />
        <Field {...field("zip")} label="ZIP code" inputMode="numeric" autoComplete="postal-code" />
      </div>

      <Field {...field("phone")} label="Phone number" type="tel" inputMode="tel" autoComplete="tel" />
      <CheckboxRow {...check("saveAddress")}>Save this address to my account</CheckboxRow>
    </CheckoutSection>
  );
}