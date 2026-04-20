"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { EASE_OUT } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <motion.section
      ref={ref}
      aria-labelledby="hero-heading"
      style={{ opacity, scale }}
      className="relative min-h-[100svh] overflow-hidden border-b border-line"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-cream-soft),var(--color-cream))]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-40 pb-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-48 lg:pb-32">
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] text-matcha-mid"
          >
            Est. Jakarta &middot; Sourced from Japan
          </motion.p>

          <h1
            id="hero-heading"
            className="mt-8 text-[13vw] leading-[0.98] text-matcha-deep md:text-7xl lg:text-[7.5rem]"
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.3 }}
              className="block"
            >
              A quiet laboratory
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.4 }}
              className="block italic text-matcha-mid"
            >
              for tea lovers.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.55 }}
            className="mt-10 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Single-origin ceremonial and culinary matcha, stone-milled fresh
            and paired with tools that earn their place on your counter. Made
            for the ritual, made for the everyday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <LinkButton href="/shop">Shop Matcha</LinkButton>
            <LinkButton href="/story" variant="ghost">
              Read the story
            </LinkButton>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imageY }} className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0, 3, 0] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              role="img"
              aria-label="A chawan of freshly whisked matcha beside a bamboo chasen, soft morning light"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-br from-matcha-light via-matcha-mid to-matcha-deep shadow-[0_40px_100px_-40px_rgba(74,93,58,0.55)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,247,240,0.35),transparent_55%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(74,93,58,0.4),transparent_60%)]"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream/90">
                <span className="serif text-2xl italic">usucha</span>
                <span className="text-[10px] uppercase tracking-[0.3em]">
                  Photography placeholder
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
