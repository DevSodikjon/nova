"use client";

import { useAuth } from "@/context/AuthContext";
import { accountStats } from "@/data/account";
import AccountShell from "@/components/Account/accountShell";
import StatCard from "@/components/Account/statCard";
import ProfileDetails from "@/components/Account/profileDetails";
import DefaultAddress from "@/components/Account/defaultAddress";
import RecentOrder from "@/components/Account/recentOrder";
import SavedForLater from "@/components/Account/savedForLater";
import { BoxIcon, HeartIcon, PinIcon } from "@/components/Account/icons";

import { useShop } from "@/context/shopContext";
import { product } from "@/data/products";
import { getStockStatus } from "@/lib/stock";

const statIcons = {
  orders: <BoxIcon />,
  saved: <HeartIcon />,
  addresses: <PinIcon />,
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function AccountPage() {
  const { user } = useAuth();

  const fullName = user?.displayName ?? "Guest";
  const firstName = fullName.split(" ")[0];
  const memberSince = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const { wishlist } = useShop();
  const lowCount = wishlist.filter((id) => {
    const p = product.find((x) => x.id === id);
    return p && getStockStatus(p) === "Low stock";
  }).length;

  return (
    <AccountShell
      title={`${greeting()}, ${firstName}.`}
      subtitle="Your account at a glance."
      right={
        memberSince && (
          <p className="text-sm text-[#6b6b63]">Member since {memberSince}</p>
        )
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {accountStats.map((s) => (
            <StatCard
              key={s.key}
              icon={statIcons[s.key]}
              value={s.key === "saved" ? wishlist.length : s.value}
              label={s.label}
              note={s.key === "saved" ? `${lowCount} low in stock` : s.note}
            />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProfileDetails fullName={fullName} email={user?.email ?? ""} />
          <DefaultAddress />
        </div>

        <RecentOrder />
        <SavedForLater />
      </div>
    </AccountShell>
  );
}
