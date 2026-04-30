"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { EASE_OUT } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/shop/${product.slug}`}
        prefetch={false}
        aria-label={`${product.name} ${product.subtitle}`}
        className="group block focus:outline-none"
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative aspect-square w-full overflow-hidden rounded-sm bg-cream-soft ring-1 ring-line transition-[box-shadow,ring-color] duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(74,93,58,0.35)] group-hover:ring-matcha-mid"
        >
          <Image
            src={product.images.main}
            alt={`${product.name} — ${product.subtitle}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute left-4 top-4 rounded-full border border-line bg-cream/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-matcha-deep backdrop-blur">
            {product.grade ?? product.category}
          </span>
        </motion.div>

        <div className="mt-6">
          <div>
            <h3 className="serif text-2xl text-ink transition-colors duration-500 group-hover:text-matcha-deep">
              {product.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-soft">
              {product.origin}
              {product.size ? ` · ${product.size}` : null}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
      </Link>
    </motion.div>
  );
}
