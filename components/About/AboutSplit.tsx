import Image from "next/image";

type AboutSplitProps = {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string;
  alt: string;
  reverse?: boolean; // rasm o'ng tomonda
  tone?: string; // fon rangi
};

export default function AboutSplit({
  id,
  eyebrow,
  title,
  paragraphs,
  image,
  alt,
  reverse = false,
  tone = "bg-[#f4f1ea]",
}: AboutSplitProps) {
  return (
    <section id={id} className={`${tone} scroll-mt-24 py-14 sm:py-20`}>
      <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-md ${reverse ? "lg:order-2" : ""}`}>
          <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-light leading-tight text-black sm:text-4xl lg:text-5xl">{title}</h2>
          <div className="mt-5 flex max-w-md flex-col gap-4 text-[#6b6b63]">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}