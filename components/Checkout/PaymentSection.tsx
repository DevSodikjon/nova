import type { Bindings } from "@/lib/checkout";
import CheckoutSection from "./CheckoutSection";
import Field, { CheckboxRow } from "./Field";

const brands = ["VISA", "MC", "AMEX"];

export default function PaymentSection({ field, check }: Bindings) {
  return (
    <CheckoutSection
      number={4}
      title="Payment"
      last
      right={
        <div className="flex gap-2">
          {brands.map((b) => (
            <span
              key={b}
              className="rounded-sm border border-black/15 bg-white px-2 py-1 text-[9px] font-semibold tracking-wider text-[#3c5048]"
            >
              {b}
            </span>
          ))}
        </div>
      }
    >
      <Field
        {...field("cardNumber")}
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        showCheck
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field {...field("expiry")} label="Expiration" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" />
        <Field {...field("cvc")} label="Security code" type="password" inputMode="numeric" autoComplete="cc-csc" />
      </div>

      <Field {...field("cardName")} label="Name on card" autoComplete="cc-name" />
      <CheckboxRow {...check("billingSame")}>Billing address is the same as shipping</CheckboxRow>
    </CheckoutSection>
  );
}