import Link from "next/link";
import { defaultAddress as a } from "@/data/account";
import { PinIcon } from "./icons";

export default function defaultAddress() {
  return (
    <section className="rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-medium text-black">Default address</h2>
        <Link href="/account/addresses" className="text-sm text-black underline underline-offset-4">
          Manage
        </Link>
      </div>

      <div className="mt-6 flex gap-3">
        <span className="mt-0.5 text-[#3c5048]">
          <PinIcon />
        </span>
        <div className="text-sm text-[#6b6b63]">
          <p className="font-semibold text-black">
            {a.label} · {a.name}
          </p>
          <p className="mt-2">{a.street}</p>
          <p>{a.city}</p>
          <p>{a.country}</p>
          <p className="mt-2 text-[#9a9a92]">{a.phone}</p>
        </div>
      </div>
    </section>
  );
}