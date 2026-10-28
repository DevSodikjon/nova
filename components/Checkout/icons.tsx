type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const CheckIcon = ({ size = 14 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const CheckCircleIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l3 3 5-6" />
  </svg>
);

export const LockIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const ShieldIcon = ({ size = 14 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3Z" />
  </svg>
);

export const RefreshIcon = ({ size = 14 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8" />
    <path d="M18.5 2v4h-4M5.5 22v-4h4" />
  </svg>
);

export const ChatIcon = ({ size = 14 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const TruckIcon = ({ size = 22 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M2 6h11v10H2z" />
    <path d="M13 9h4l3 3v4h-7" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
);

export const PinIcon = ({ size = 22 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);