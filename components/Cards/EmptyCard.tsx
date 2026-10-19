import Link from "next/link";

export default function EmptyCard({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="mt-8 flex flex-col gap-8 rounded-sm border border-black/10 bg-[#fdfcf9] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#dfe8e2] text-[#3c5048]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
            <path d="M6 8h12l1 13H5L6 8Z" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          </svg>
        </div>

        <div>
          <h2 className="max-w-md text-3xl font-light leading-tight text-black">
            Your cart is ready for something considered.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-[#6b6b63]">
            {signedIn
              ? "Explore new arrivals and add the pieces you love."
              : "Explore new arrivals, or sign in to recover pieces saved during an earlier visit."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/shop?sort=new"
          className="rounded-sm bg-[#1c1c1a] px-6 py-3.5 text-sm text-white transition hover:bg-black/85"
        >
          Shop new arrivals
        </Link>
        {!signedIn && (
          <Link
            href="/login"
            className="rounded-sm border border-black/15 bg-white px-6 py-3.5 text-sm text-black transition hover:bg-black/5"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}