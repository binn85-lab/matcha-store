"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import type { Product } from "@/types/product";
import { formatIDR } from "@/lib/utils";
import { useCart } from "@/store/cart";
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
  product: Product;
  galleryImages: string[];
}

export function ProductShowcase({ product, galleryImages }: ProductShowcaseProps) {
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
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const [mainImage, setMainImage] = useState<string>(
    galleryImages[0] ?? product.images.main,
  );
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((s) => s.addItem);

  const hasThumbs = galleryImages.length > 1;

  return (
    <motion.section
      id={SHOWCASE_ANCHOR_ID}
      ref={sectionRef}
      aria-labelledby="showcase-heading"
      style={{ backgroundColor }}
      className="relative overflow-hidden px-6 py-40 lg:px-20 lg:py-56"
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
          The Flagship
        </motion.p>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div style={{ y: imageY }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={revealViewport}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-cream-soft shadow-[0_40px_100px_-40px_rgba(74,93,58,0.45)]"
              style={{ transitionDuration: "3000ms" }}
            >
              <Image
                src={mainImage}
                alt={`${product.name} — ${product.subtitle} from ${product.origin}`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          </motion.div>

          {hasThumbs ? (
            <div className="mt-5 flex gap-3">
              {galleryImages.map((img) => {
                const active = img === mainImage;
                return (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Show ${product.name} detail`}
                    aria-pressed={active}
                    onClick={() => setMainImage(img)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-sm border transition-all duration-300 ${
                      active
                        ? "border-matcha-deep ring-1 ring-matcha-deep"
                        : "border-line hover:border-matcha-mid"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.28em] text-matcha-mid"
          >
            Ceremonial Grade · {product.size}
          </motion.p>

          <motion.h2
            id="showcase-heading"
            variants={itemVariants}
            className="serif mt-10 text-7xl italic leading-[0.9] text-matcha-deep lg:text-9xl"
          >
            {product.name}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="serif mt-5 text-2xl text-ink lg:text-3xl"
          >
            {product.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-1"
          >
            <span className="serif text-2xl text-matcha-deep">
              {formatIDR(product.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Inclusive of PPN
            </span>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mt-12 space-y-3 text-sm leading-relaxed text-ink-soft"
          >
            <li className="flex items-baseline gap-3">
              <span aria-hidden="true" className="text-matcha-mid">
                ·
              </span>
              <span>Origin: {product.origin} · Single estate</span>
            </li>
            {product.harvest ? (
              <li className="flex items-baseline gap-3">
                <span aria-hidden="true" className="text-matcha-mid">
                  ·
                </span>
                <span>Harvest: {product.harvest}</span>
              </li>
            ) : null}
            {product.tastingNotes?.length ? (
              <li className="flex items-baseline gap-3">
                <span aria-hidden="true" className="text-matcha-mid">
                  ·
                </span>
                <span>Notes: {product.tastingNotes.join(", ")}</span>
              </li>
            ) : null}
          </motion.ul>

          <motion.p
            variants={itemVariants}
            className="serif mt-12 max-w-md text-lg leading-relaxed text-ink"
          >
            {product.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-14 flex items-center gap-4"
          >
            <div
              className="inline-flex items-center rounded-full border border-line"
              role="group"
              aria-label="Quantity"
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg text-ink-soft transition-colors hover:text-matcha-deep"
              >
                −
              </button>
              <span
                aria-live="polite"
                className="w-8 text-center text-sm tabular-nums"
              >
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2 text-lg text-ink-soft transition-colors hover:text-matcha-deep"
              >
                +
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onClick={() => addItem(product, quantity)}
              className="inline-flex items-center justify-center rounded-full bg-matcha-deep px-10 py-4 text-sm tracking-wide text-cream transition-colors duration-300 hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Add to Ritual
            </motion.button>
            <Link
              href={`/shop/${product.slug}`}
              prefetch={false}
              className="text-sm text-ink underline underline-offset-[6px] transition-colors hover:text-matcha-deep"
            >
              View full details
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-14 text-[11px] uppercase tracking-[0.22em] text-ink-soft"
          >
            Free shipping across Indonesia &middot; Ships within 24 hours &middot;
            Harvested this season
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}
