import { FREE_SHIPPING_THRESHOLD } from "@/lib/card";

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const perks = [
  {
    title: "Free delivery",
    text: `On orders over $${FREE_SHIPPING_THRESHOLD}`,
    icon: (
      <svg {...iconProps}>
        <path d="M2 6h11v10H2z" />
        <path d="M13 9h4l3 3v4h-7" />
        <circle cx="7" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Easy returns",
    text: "Within 30 days",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8" />
        <path d="M18.5 2v4h-4M5.5 22v-4h4" />
      </svg>
    ),
  },
  {
    title: "Need help?",
    text: "Chat with a stylist",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      </svg>
    ),
  },
];

export default function CardPerks() {
  return (
    <div className="grid gap-6 border-t border-black/10 pt-6 sm:grid-cols-3">
      {perks.map((perk) => (
        <div key={perk.title} className="flex items-start gap-3 text-[#3c5048]">
          {perk.icon}
          <div>
            <p className="text-sm font-semibold text-black">{perk.title}</p>
            <p className="text-xs text-[#6b6b63]">{perk.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}