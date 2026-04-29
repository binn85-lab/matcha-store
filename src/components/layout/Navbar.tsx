"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { useSmartShopScroll } from "@/lib/use-smart-shop-scroll";

const navLinks = [
  { href: "/shop", label: "Shop", smartShop: true },
  { href: "/story", label: "The Matcha Story" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onShop = useSmartShopScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 100);
  });

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-line bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent backdrop-blur-0"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"
        >
          <Link
            href="/"
            aria-label="Homelab — home"
            className="block transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/brand/homelab-logo.png"
              alt="Homelab"
              width={8000}
              height={1342}
              priority
              className={`h-7 w-auto object-contain transition-[filter] duration-500 md:h-8 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={"smartShop" in link && link.smartShop ? onShop : undefined}
                  className="group relative text-sm tracking-wide text-ink-soft transition-colors duration-300 hover:text-matcha-deep"
                >
                  <span className="relative">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-matcha-mid transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-all duration-300 hover:scale-110 hover:bg-cream-soft hover:text-matcha-deep md:flex"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <Link
              href="/cart"
              prefetch={false}
              aria-label="Cart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-all duration-300 hover:scale-110 hover:bg-cream-soft hover:text-matcha-deep"
            >
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-all duration-300 hover:scale-110 hover:bg-cream-soft hover:text-matcha-deep md:hidden"
            >
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? <MobileMenu onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const onShop = useSmartShopScroll();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className="fixed inset-0 z-[70] flex flex-col bg-cream md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-20 items-center justify-between px-6">
        <Image
          src="/brand/homelab-logo.png"
          alt="Homelab"
          width={8000}
          height={1342}
          priority
          className="h-7 w-auto object-contain"
        />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-soft hover:text-matcha-deep"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
        className="flex flex-1 flex-col justify-center gap-6 px-8"
      >
        {navLinks.map((link) => (
          <motion.li
            key={link.href}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: EASE_OUT },
              },
            }}
          >
            <Link
              href={link.href}
              prefetch={false}
              onClick={(e) => {
                if ("smartShop" in link && link.smartShop) onShop(e);
                onClose();
              }}
              className="serif block text-5xl text-matcha-deep transition-colors hover:text-matcha-mid"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      <div className="px-8 pb-10 text-xs uppercase tracking-[0.22em] text-ink-soft">
        Matcha Indonesia &middot; Jakarta
      </div>
    </motion.div>
  );
}
