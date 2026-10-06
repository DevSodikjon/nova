"use client";

import { useState } from "react";

type Section = { title: string; content: string };

type DetailsAccordionProps = {
  sections: Section[];
};

export default function DetailsAccordion({ sections }: DetailsAccordionProps) {
  const [open, setOpen] = useState(sections[0]?.title ?? "");

  return (
    <div className="flex flex-col divide-y divide-black/10 border-t border-black/10">
      {sections.map((s) => {
        const isOpen = open === s.title;
        return (
          <div key={s.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? "" : s.title)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-medium text-black">{s.title}</span>
              <span className="text-black/50">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <p className="pb-4 text-sm text-[#6b6b63]">{s.content}</p>}
          </div>
        );
      })}
    </div>
  );
}