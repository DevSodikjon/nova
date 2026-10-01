import Link from "next/link";
import Image from "next/image";

export default function NovaEdit() {
  return (
    <section className="bg-[#f4f1ea] py-14 sm:py-20">
      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:aspect-[16/11]">
          <Image
            src="/images/novaEdit.svg"
            alt="Two women in tailored cream suits walking through an arched stone colonnade"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">The Nova edit</p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-black">
            Tailoring, without the formality.
          </h2>

          <p className="mt-4 max-w-md text-[#6b6b63]">
            Unstructured jackets meet fluid trousers in a modular wardrobe built for the pace of real days. Precise
            where it matters, easy everywhere else.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Read the editorial
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}