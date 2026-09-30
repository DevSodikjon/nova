import React from "react";
import Image from "next/image";
import Link from "next/link";

import Hero from "@/sections/Home/hero"
import Wardrobe from "@/sections/Home/wardrobe"

export default function Home() {
  return (
   <main>
    <Hero/>
    <Wardrobe/>
   </main>
  );
}
