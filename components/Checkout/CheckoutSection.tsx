import type { ReactNode } from "react";

type CheckoutSectionProps = {
  number: number;
  title: string;
  right?: ReactNode;
  last?: boolean;
  children: ReactNode;
};

export default function CheckoutSection({ number, title, right, last, children }: CheckoutSectionProps) {
  return (
    <section className={`py-8 ${last ? "" : "border-b border-black/10"}`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-light text-black">
          {number}. {title}
        </h2>
        {right}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}