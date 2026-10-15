import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: number;
  label: string;
  note: string;
};

export default function statCard({ icon, value, label, note }: StatCardProps) {
  return (
    <div className="rounded-sm border border-black/10 bg-[#fdfcf9] p-5">
      <div className="flex items-start justify-between text-[#3c5048]">
        {icon}
        <span className="text-3xl font-light text-black">{value}</span>
      </div>
      <p className="mt-6 text-sm font-semibold text-black">{label}</p>
      <p className="mt-1 text-xs text-[#9a9a92]">{note}</p>
    </div>
  );
}