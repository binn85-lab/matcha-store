"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const storyPoints = [
  {
    title: "Japanese matcha, prepared for Indonesia",
    body: "Homelab selects Japanese matcha powder with a clean green aroma, smooth umami, and low bitterness so every cup feels balanced in Jakarta's warm mornings.",
  },
  {
    title: "Made for latte, whisk, and daily ritual",
    body: "Our matcha is easy to prepare as iced matcha latte, warm usucha, or a simple daily drink with milk. It dissolves beautifully after sifting and whisking.",
  },
  {
    title: "Small batches, fresher flavor",
    body: "We keep the collection focused so each jar and pouch stays useful, approachable, and ready for anyone searching for premium matcha in Indonesia.",
  },
];

export function MatchaRitualStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const lineWidth = useTransform(scrollYProgress, [0.12, 0.7], ["0%", "100%"]);

  return (
    <section
      id="matcha-ritual-story"
      ref={ref}
      aria-labelledby="ritual-story-heading"
      className="relative overflow-hidden bg-[#F4EFE4]"
    >
      <div className="mx-auto grid min-h-[92vh] max-w-[1600px] items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
        <motion.div
          style={{ y: imageY }}
          className="relative order-2 lg:order-1 lg:col-span-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.32 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="relative aspect-[5/4] overflow-hidden rounded-sm bg-cream shadow-[0_44px_120px_-58px_rgba(74,93,58,0.65)]"
          >
            <Image
              src="/story/matcha-whisk.jpg"
              alt="Bamboo chasen whisk covered in green matcha for a Japanese matcha ritual"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="order-1 lg:order-2 lg:col-span-6 lg:pl-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-matcha-mid" />
            <p className="text-xs uppercase tracking-[0.32em] text-matcha-mid">
              Homelab ritual
            </p>
          </motion.div>

          <motion.h2
            id="ritual-story-heading"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.08 }}
            className="mt-8 max-w-3xl text-5xl leading-[1.02] text-matcha-deep md:text-7xl"
          >
            Premium matcha for a slower,
            <span className="italic text-matcha-mid"> better cup.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.16 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Homelab is a matcha store in Indonesia for people who want Japanese
            matcha that tastes calm, bright, and easy to enjoy at home. From
            Uji-style matcha powder to everyday matcha latte rituals, every
            product is chosen for freshness, texture, and a clean finish.
          </motion.p>

          <div className="relative mt-10 h-px w-full bg-line/70">
            <motion.span
              aria-hidden="true"
              style={{ width: lineWidth }}
              className="absolute inset-y-0 left-0 block bg-matcha-deep"
            />
          </div>

          <div className="mt-10 grid gap-7">
            {storyPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.85,
                  ease: EASE_OUT,
                  delay: 0.12 + index * 0.08,
                }}
                className="grid gap-3 border-b border-line/70 pb-7 last:border-b-0 last:pb-0 md:grid-cols-[120px_1fr]"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-xl text-matcha-deep">{point.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                    {point.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
