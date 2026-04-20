"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function SourcedFromJapan() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#FAF7F0", "#F0EBD8", "#FAF7F0"],
  );
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.75], ["0%", "100%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.section
      ref={ref}
      aria-labelledby="sourced-heading"
      style={{ backgroundColor }}
      className="relative overflow-hidden"
    >
      <div className="relative mx-auto flex min-h-[90vh] max-w-[1600px] flex-col justify-center px-6 py-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-matcha-mid" />
          <p id="sourced-heading" className="text-xs uppercase tracking-[0.32em] text-matcha-mid">
            Sourced from
          </p>
        </motion.div>

        <motion.h2
          style={{ y: headlineY }}
          className="serif mt-10 text-[14vw] leading-[0.92] tracking-tight text-matcha-deep md:text-[11rem] lg:text-[14rem]"
        >
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="block"
          >
            Kyoto
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
            className="block italic text-matcha-mid"
          >
            &amp; Aichi.
          </motion.span>
        </motion.h2>

        <div className="relative mt-20 h-px w-full bg-line/60">
          <motion.span
            aria-hidden="true"
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 block bg-matcha-deep"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
          className="mt-16 grid gap-12 md:grid-cols-3"
        >
          {[
            {
              region: "Uji, Kyoto",
              note: "First-harvest tencha from shaded fields. The spiritual home of ceremonial matcha.",
            },
            {
              region: "Nishio, Aichi",
              note: "Honshu's quiet workhorse. Rounded, full-bodied culinary grade built for everyday cups.",
            },
            {
              region: "Takayama, Nara",
              note: "The village where bamboo chasen has been handcut for five centuries.",
            },
          ].map((region) => (
            <div key={region.region} className="max-w-xs">
              <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                {region.region}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {region.note}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
