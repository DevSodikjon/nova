import Link from "next/link";

type PaginationProps = {
  current: number;
  total: number;
  basePath: string;
};

export default function Pagination({ current, total, basePath }: PaginationProps) {
  const pageHref = (p: number) => `${basePath}?page=${p}`;

  const pages = Array.from({ length: Math.min(4, total) }, (_, i) => i + 1);
  const showLastPage = total > pages.length;

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={pageHref(Math.max(1, current - 1))}
        aria-label="Previous page"
        aria-disabled={current === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black ${
          current === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        ‹
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm ${
            p === current ? "bg-black text-white" : "text-black hover:bg-black/5"
          }`}
        >
          {p}
        </Link>
      ))}

      {showLastPage && (
        <>
          <span className="px-1 text-black/40">…</span>
          <Link
            href={pageHref(total)}
            className={`flex h-9 w-9 items-center justify-center rounded-md text-sm ${
              current === total ? "bg-black text-white" : "text-black hover:bg-black/5"
            }`}
          >
            {total}
          </Link>
        </>
      )}

      <Link
        href={pageHref(Math.min(total, current + 1))}
        aria-label="Next page"
        aria-disabled={current === total}
        className={`flex h-9 w-9 items-center justify-center rounded-md border border-black/15 text-black ${
          current === total ? "pointer-events-none opacity-40" : ""
        }`}
      >
        ›
      </Link>
    </nav>
  );
}