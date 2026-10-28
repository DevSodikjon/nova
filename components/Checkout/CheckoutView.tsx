"use client";

import { useState } from "react";
import { deliveryOptions } from "@/data/checkout";
import { getCardTotals, withShipping, type CartLine } from "@/lib/card";
import {
  fieldOrder,
  firstErrorField,
  formatValue,
  getActiveStep,
  getShippingCost,
  isContactComplete,
  validate,
  deliveryRange,

  type BoolField,
  type CheckBindings,
  type CheckoutData,
  type FieldBindings,
  type PlacedOrder,
  type TextField,
} from "@/lib/checkout";
import CheckoutSteps from "./CheckoutSteps";
import ContactSection from "./ContactSection";
import ShippingSection from "./ShippingSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";
import CheckoutSummary from "./CheckoutSummary";
import { CheckCircleIcon, LockIcon } from "./icons";

type Defaults = { email: string; firstName: string; lastName: string };

type CheckoutViewProps = {
  lines: CartLine[];
  defaults: Defaults;
  onPlaced: (order: PlacedOrder) => void;
};

function initialData(d: Defaults): CheckoutData {
  return {
    email: d.email,
    firstName: d.firstName,
    lastName: d.lastName,
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardName: `${d.firstName} ${d.lastName}`.trim(),
    newsletter: true,
    saveAddress: true,
    billingSame: true,
    delivery: "standard",
  };
}

export default function CheckoutView({ lines, defaults, onPlaced }: CheckoutViewProps) {
  const [data, setData] = useState<CheckoutData>(() => initialData(defaults));
  const [touched, setTouched] = useState<Partial<Record<TextField, boolean>>>({});

  const errors = validate(data);
  const step = getActiveStep(errors);

  // Summalar: savat summasi + tanlangan yetkazib berish narxi
  const baseTotals = getCardTotals(lines);
  const option = deliveryOptions.find((o) => o.id === data.delivery) ?? deliveryOptions[0];
  const totals = withShipping(baseTotals, getShippingCost(option, baseTotals.subtotal));

  // Bo'limlarga beriladigan ulagichlar
  function field(name: TextField): FieldBindings {
    const value = data[name];
    return {
      id: name,
      value,
      onChange: (v) => setData((d) => ({ ...d, [name]: formatValue(name, v) } as CheckoutData)),
      onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
      error: touched[name] ? errors[name] : undefined,
      valid: value.trim() !== "" && !errors[name],
    };
  }

  function check(name: BoolField): CheckBindings {
    return {
      checked: data[name],
      onChange: (v) => setData((d) => ({ ...d, [name]: v })),
    };
  }

  // Hamma xatolarni ko'rsatadi va birinchi xatoga fokus beradi
  function validateAll(): boolean {
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    const first = firstErrorField(errors);
    if (first) {
      document.getElementById(first)?.focus();
      return false;
    }
    return true;
  }

  function continueToReview() {
    if (validateAll()) {
      document.getElementById("order-summary")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function placeOrder() {
  if (!validateAll()) return;
  const id = `NVA-${Math.floor(10000 + Math.random() * 90000)}`;

  onPlaced({
    id,
    placedAt: new Date().toISOString(),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: {
      street: data.address,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      zip: data.zip,
    },
    delivery: { label: option.label, range: deliveryRange(option), cost: totals.shipping },
    lines,
    totals,
  });
}

  return (
    <>
      <div className="border-b border-black/10 bg-[#fdfcf9]">
        <div className="container py-6 sm:py-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-light text-black sm:text-5xl">Checkout</h1>
            <p className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#3c5048]">
              <LockIcon size={14} />
              Secure encrypted checkout
            </p>
          </div>
          <div className="mt-6">
            <CheckoutSteps activeIndex={step} />
          </div>
        </div>
      </div>

      <div className="bg-[#f4f1ea] py-8 sm:py-10">
        <div className="container grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              continueToReview();
            }}
          >
            {isContactComplete(errors) && (
              <div className="flex items-start gap-3 rounded-sm bg-[#dfe8e2] p-4 text-[#3c5048]">
                <CheckCircleIcon />
                <div>
                  <p className="text-xs font-semibold">Contact complete</p>
                  <p className="text-xs">Receipt and delivery updates will be sent to {data.email}.</p>
                </div>
              </div>
            )}

            <ContactSection field={field} check={check} />
            <ShippingSection field={field} check={check} />
            <DeliverySection
              selected={data.delivery}
              onSelect={(id) => setData((d) => ({ ...d, delivery: id }))}
              subtotal={baseTotals.subtotal}
            />
            <PaymentSection field={field} check={check} />

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-sm bg-[#1c1c1a] py-4 text-sm text-white transition hover:bg-black/85"
            >
              Continue to review
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          <CheckoutSummary lines={lines} totals={totals} onPlaceOrder={placeOrder} />
        </div>
      </div>
    </>
  );
}