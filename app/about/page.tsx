import Image from "next/image";
import AboutSplit from "@/components/About/AboutSplit";
import MembersBanner from "@/components/MembersBanner/MembersBanner"; // yo'lni o'zingizdagiga moslang
import Newsletter from "@/sections/Home/newsLetter"; // yo'lni o'zingizdagiga moslang
import { aboutHero, aboutMaterials, aboutStory, principles } from "@/data/about";

export const metadata = { title: "About — NOVA" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={aboutHero.image}
          alt={aboutHero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="container absolute inset-x-0 bottom-0 pb-10 text-white sm:pb-16">
          <p className="text-xs font-semibold uppercase tracking-widest">{aboutHero.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            {aboutHero.title}
          </h1>
        </div>
      </section>

      {/* Our story */}
      <AboutSplit {...aboutStory} />

      {/* Printsiplar */}
      <section className="bg-[#faf8f3] py-14 sm:py-20">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b63]">What guides us</p>
          <div className="mt-8 grid gap-10 border-t border-black/10 pt-8 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.number}>
                <span className="text-sm text-[#3c5048]">{p.number}</span>
                <h3 className="mt-3 text-2xl font-light text-black">{p.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-[#6b6b63]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials: rasm o'ng tomonda */}
      <AboutSplit {...aboutMaterials} reverse tone="bg-[#f4f1ea]" />

      <MembersBanner />
      <Newsletter />
    </>
  );
}