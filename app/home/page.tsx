import React from "react";
import Image from "next/image";
import Link from "next/link";

import Hero from "@/sections/Home/hero"
import Wardrobe from "@/sections/Home/wardrobe"
import Products from "@/sections/Home/products";
import NovaEdit from "@/sections/Home/novaEdit";
import MembersBanner from "@/sections/Home/members";
import Newsletter from "@/sections/Home/newsLetter";
import LoginPage from "../login/page";

export default function Home() {
  return (
   <main>
    <Hero/>
    <Wardrobe/>
    <Products/>
    <NovaEdit/>
    <MembersBanner/>
    <Newsletter/>
   </main>
  );
}
