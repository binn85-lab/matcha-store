"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT, revealViewport } from "@/lib/motion";

interface Block {
  kanji: string;
  eyebrow: string;
  heading: string;
  headingItalic?: string;
  body: string;
  notes: string[];
  gradient: string;
  imageAlt: string;
  reverse?: boolean;
}

const blocks: Block[] = [
  {
    kanji: "濃茶",
    eyebrow: "Ceremonial · Koicha · Usucha",
    heading: "First harvest.",
    headingItalic: "Whisked with water alone.",
    body: "Shade-grown first-harvest tencha, de-stemmed and stone-milled the morning it ships. A bright, layered cup that rewards slow attention — the kind of matcha that asks you to sit down.",
    notes: ["First harvest", "Stone-milled", "Whisk with water"],
    gradient:
      "linear-gradient(135deg, #c5d1a8 0%, #7a8b5c 55%, #4a5d3a 100%)",
    imageAlt: "Ceremonial-grade matcha in a chawan, photographed in soft morning light",
  },
  {
    kanji: "料理",
    eyebrow: "Culinary · Ryori-yō",
    heading: "Everyday ritual.",
    headingItalic: "Built for milk and heat.",
    body: "A bolder, rounder matcha made for lattes, baking, and daily cups. Resilient in a bake, honest in a glass — the tin you reach for before the world wakes up.",
    notes: ["Full-bodied", "Latte & bake", "Daily ritual"],
    gradient:
      "linear-gradient(225deg, #d8e1bc 0%, #94a476 50%, #5d6e48 100%)",
    imageAlt: "Culinary-grade matcha being sifted into a glass carafe",
    reverse: true,
  },
];

export function MatchaStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="border-t border-line bg-cream-soft"
    >
      <div className="mx-auto max-w-7xl px-6 py-40 lg:px-10 lg:py-52">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-3xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
            }}
            className="text-xs uppercase tracking-[0.3em] text-matcha-mid"
          >
            The Matcha Story
          </motion.p>
          <motion.h2
            id="story-heading"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
            }}
            className="mt-5 text-5xl leading-[1.05] text-matcha-deep md:text-6xl"
          >
            One leaf.
            <br />
            <span className="italic">Two rituals.</span>
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
          >
            Matcha isn&rsquo;t one thing. A ceremonial cup asks for patience and
            water; a culinary tin asks for milk and mornings. We carry both
            because both deserve to be made well.
          </motion.p>
        </motion.div>

        <div className="mt-32 space-y-40">
          {blocks.map((block) => (
            <StoryBlock key={block.heading} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-12 md:grid-cols-12 md:gap-16"
    >
      <motion.div
        style={{ y: imageY }}
        className={`md:col-span-6 ${block.reverse ? "md:order-2" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          role="img"
          aria-label={block.imageAlt}
          style={{ background: block.gradient }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_40px_100px_-40px_rgba(74,93,58,0.45)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,247,240,0.3),transparent_60%)]"
          />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream/85">
            <span className="serif text-5xl italic">{block.kanji}</span>
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Photography placeholder
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className={`md:col-span-6 ${block.reverse ? "md:order-1" : ""}`}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
          }}
          className="text-xs uppercase tracking-[0.22em] text-matcha-mid"
        >
          {block.eyebrow}
        </motion.p>
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
          }}
          className="mt-5 text-4xl leading-[1.08] text-matcha-deep md:text-5xl"
        >
          {block.heading}
          {block.headingItalic ? (
            <>
              <br />
              <span className="italic text-matcha-mid">{block.headingItalic}</span>
            </>
          ) : null}
        </motion.h3>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
          }}
          className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {block.body}
        </motion.p>
        <motion.ul
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
          }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {block.notes.map((note) => (
            <li
              key={note}
              className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-soft"
            >
              {note}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
