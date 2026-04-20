"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_OUT, revealViewport } from "@/lib/motion";

export function Newsletter() {
  const [focused, setFocused] = useState(false);

  return (
    <section
      aria-labelledby="newsletter-heading"
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
        className="grid gap-12 md:grid-cols-12 md:items-center"
      >
        <div className="md:col-span-6">
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE_OUT },
              },
            }}
            className="text-xs uppercase tracking-[0.3em] text-matcha-mid"
          >
            Surat kabar &middot; Newsletter
          </motion.p>
          <motion.h2
            id="newsletter-heading"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: EASE_OUT },
              },
            }}
            className="mt-5 text-5xl leading-[1.05] text-matcha-deep md:text-6xl"
          >
            Seduhan baru,
            <br />
            <span className="italic">fresh brews in your inbox.</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: EASE_OUT },
              },
            }}
            className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Sekali sebulan — kami kirim cerita panen, resep, dan akses awal ke
            stok terbatas. Tidak ada spam, tidak ada basa-basi.
            <span className="mt-3 block text-sm italic text-matcha-mid">
              One email a month — harvest notes, recipes, and early access.
              No noise.
            </span>
          </motion.p>
        </div>

        <motion.form
          aria-label="Newsletter signup"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: EASE_OUT },
            },
          }}
          className="md:col-span-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="rounded-sm border border-line bg-cream p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full flex-1">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="peer w-full bg-transparent px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:outline-none"
                />
                <motion.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleX: focused ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="absolute inset-x-4 bottom-1 block h-px origin-left bg-matcha-mid"
                />
              </div>
              <motion.button
                type="submit"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  duration: 0.6,
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2,
                }}
                className="group relative overflow-hidden rounded-full bg-matcha-deep px-7 py-3 text-sm tracking-wide text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-matcha-mid to-matcha-deep transition-transform duration-500 ease-out group-hover:translate-x-0"
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  Subscribe
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </motion.button>
            </div>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Dengan mendaftar, Anda setuju menerima email dari Homelab. /
            By subscribing you agree to receive emails from Homelab.
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
}
