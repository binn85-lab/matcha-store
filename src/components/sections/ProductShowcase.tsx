"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import type { Product } from "@/types/product";
import { EASE_OUT, revealViewport } from "@/lib/motion";
import { SHOWCASE_ANCHOR_ID } from "@/lib/use-smart-shop-scroll";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

interface ProductShowcaseProps {
  products: Product[];
}

const marketplaceLinks = [
  {
    label: "Shopee",
    href: "https://s.shopee.co.id/70Gb0DtNUE",
  },
  {
    label: "Tokopedia",
    href: "https://tk.tokopedia.com/ZS9fFGx3F/",
  },
  {
    label: "TikTok Shop",
    href: "https://vt.tiktok.com/ZS9fYFr3t/?page=Mall",
  },
];

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#FAF7F0", "#F5F0E0", "#FAF7F0"],
  );
  const lineWidth = useTransform(scrollYProgress, [0.05, 0.35], ["0%", "100%"]);

  return (
    <motion.section
      id={SHOWCASE_ANCHOR_ID}
      ref={sectionRef}
      aria-labelledby="showcase-heading"
      style={{ backgroundColor }}
      className="relative overflow-hidden px-6 py-20 lg:px-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative h-px w-full bg-line/50">
          <motion.span
            aria-hidden="true"
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 block bg-matcha-deep"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mt-16 text-center text-xs uppercase tracking-[0.32em] text-matcha-mid"
        >
          Flagship Matcha
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-2">
        {products.map((product, index) => {
          return (
            <motion.article
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid gap-8 rounded-sm border border-line/70 bg-cream/70 p-5 shadow-[0_36px_100px_-60px_rgba(74,93,58,0.45)] md:p-7"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.015 }}
                className="relative aspect-square w-full overflow-hidden rounded-sm bg-cream-soft"
              >
                <Image
                  src={product.images.main}
                  alt={`${product.name} — ${product.subtitle}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-6"
                  priority={false}
                />
              </motion.div>

              <div>
                <motion.p
                  variants={itemVariants}
                  className="text-xs uppercase tracking-[0.28em] text-matcha-mid"
                >
                  Pure Matcha · {product.size}
                </motion.p>

                <motion.h2
                  id={index === 0 ? "showcase-heading" : undefined}
                  variants={itemVariants}
                  className="serif mt-5 text-5xl italic leading-[0.95] text-matcha-deep md:text-6xl"
                >
                  {product.name}
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="serif mt-4 text-xl text-ink"
                >
                  {product.subtitle}
                </motion.p>

                <motion.ul
                  variants={itemVariants}
                  className="mt-8 space-y-3 text-sm leading-relaxed text-ink-soft"
                >
                  {product.tastingNotes?.map((note) => (
                    <li key={note} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="text-matcha-mid">
                        ·
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.p
                  variants={itemVariants}
                  className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft"
                >
                  {product.description}
                </motion.p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-7xl rounded-sm border border-line bg-cream p-5 md:p-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.85, ease: EASE_OUT }}
          className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-matcha-mid">
              Beli di marketplace
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              Pilih platform yang paling nyaman untuk checkout, promo, dan
              pengiriman ke seluruh Indonesia.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {marketplaceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-matcha-deep px-6 py-3 text-sm tracking-wide text-cream transition-colors duration-300 hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.95, ease: EASE_OUT }}
        className="mx-auto mt-20 max-w-5xl"
      >
        <Image
          src="/how-to-matcha.png"
          alt="How to make matcha with Homelab Pure Matcha"
          width={1800}
          height={1200}
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="h-auto w-full rounded-sm shadow-[0_36px_100px_-55px_rgba(74,93,58,0.45)]"
        />
      </motion.div>
    </motion.section>
  );
}
