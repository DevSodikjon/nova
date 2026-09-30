import React from "react";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/data/navigation";

const social = [
  {
    name: "instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 21V13H17L17.5 10H14V8.5C14 7.5 14.5 7 15.5 7H17.5V4.2C17.15 4.15 16.35 4 15.3 4C12.8 4 11 5.5 11 8.2V10H8V13H11V21H14Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Twinter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.244 2H21.5L14.385 10.13L22.75 22H16.2L11.07 14.67L4.65 22H1.4L8.9 13.43L0.875 2H7.59L12.225 8.69L18.244 2ZM17.1 19.92H18.9L6.6 3.97H4.67L17.1 19.92Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#181917] pt-12 pb-10 sm:pt-16 sm:pb-14">
      <div className="container">
        <div className="footer_items flex flex-col gap-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:flex lg:flex-row lg:justify-between lg:gap-0">
          <div className="footer_logo sm:col-span-2 lg:col-span-1">
            <Image className="pb-[18px]" src={"/Images/Nova_light.svg"} alt="Nova" width={102} height={0} />
            <p className="text-[#A6A79F]">
              Elevated everyday pieces, considered in form <br className="hidden sm:block" /> and made to move
              through life with you.
            </p>
            <div className="social flex gap-4 mt-[38px]">
              {social.map((social) => (
                <Link key={social.name} href={social.name}>
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer_shop">
            <h3 className="text-white uppercase pb-3.5 text-bold">Shop</h3>
            <div className="flex flex-col gap-3.5">
              {footerLinks.shop.map((link) => (
                <Link className="text-[#A6A79F] hover:text-[#e4e6db]" key={link.href} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer_service">
            <h3 className="text-white uppercase pb-3.5 text-bold">service</h3>
            <div className="flex flex-col gap-3.5">
              {footerLinks.service.map((link) => (
                <Link className="text-[#A6A79F] hover:text-[#e4e6db]" key={link.href} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer_about">
            <h3 className="text-white uppercase pb-3.5 text-bold">about</h3>
            <div className="flex flex-col gap-3.5">
              {footerLinks.about.map((link) => (
                <Link className="text-[#A6A79F] hover:text-[#e4e6db]" key={link.href} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer_quot w-full sm:col-span-2 lg:w-[320px]">
            <h3 className="text-white text-bold">STAY CLOSE</h3>
            <p className="text-[#A6A79F] my-[28px]">New collections, studio stories and private offers.</p>

            <form className="flex items-center border-b border-white/30 focus-within:border-white">
              <input
                type="email"
                required
                placeholder="Email address"
                className="flex-1 min-w-0 bg-transparent outline-none text-sm text-white placeholder-white/50 py-3"
              />
              <button type="submit" aria-label="Subscribe" className="p-2 text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="line w-full h-[2px] bg-[#A6A79F] my-10 sm:my-[52px]"></div>

        <div className="info text-[#A6A79F] flex flex-col gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 NOVA Studio. All rights reserved.</p>
          <p>Privacy · Terms · Accessibility · United States / USD</p>
        </div>
      </div>
    </footer>
  );
}