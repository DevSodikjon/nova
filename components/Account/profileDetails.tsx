import Link from "next/link";
import { accountProfile } from "@/data/account";

type ProfileDetailsProps = {
  fullName: string;
  email: string;
};

export default function profileDetails({ fullName, email }: ProfileDetailsProps) {
  const rows = [
    { label: "Full name", value: fullName },
    { label: "Email", value: email },
    { label: "Phone", value: accountProfile.phone },
    { label: "Preferred size", value: accountProfile.preferredSize },
  ];

  return (
    <section className="rounded-sm border border-black/10 bg-[#fdfcf9] p-6">
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-medium text-black">Profile details</h2>
        <Link href="/account/settings" className="text-sm text-black underline underline-offset-4">
          Edit
        </Link>
      </div>

      <dl className="mt-6 flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 text-sm">
            <dt className="text-[#6b6b63]">{r.label}</dt>
            <dd className="truncate font-medium text-black">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}