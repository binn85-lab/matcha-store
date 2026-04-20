"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { featuredProducts } from "@/lib/products";
import { EASE_OUT, revealViewport } from "@/lib/motion";

export function FeaturedProducts() {
  const products = featuredProducts;
  const count = products.length;

  const gridClass =
    count === 1
      ? "mx-auto max-w-md grid-cols-1"
      : count === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-6 py-40 lg:px-10 lg:py-52"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: EASE_OUT },
              },
            }}
            className="text-xs uppercase tracking-[0.3em] text-matcha-mid"
          >
            Featured
          </motion.p>
          <motion.h2
            id="featured-heading"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: EASE_OUT },
              },
            }}
            className="mt-4 text-5xl leading-tight text-matcha-deep md:text-6xl"
          >
            This season&rsquo;s selection
          </motion.h2>
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: EASE_OUT },
            },
          }}
        >
          <Link
            href="/shop"
            prefetch={false}
            className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-300 hover:text-matcha-deep"
          >
            View all products
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
        }}
        className={`mt-20 grid gap-14 md:gap-10 lg:gap-14 ${gridClass}`}
      >
        {products.map((product) => (
          <motion.li
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: EASE_OUT },
              },
            }}
          >
            <ProductCard product={product} />
          </motion.li>
        ))}
      </motion.ul>

      {count < 3 ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
          className="mt-16 text-center text-sm italic tracking-wide text-ink-soft"
        >
          Our collection grows slowly &mdash; more harvests arriving this season.
        </motion.p>
      ) : null}
    </section>
  );
}
