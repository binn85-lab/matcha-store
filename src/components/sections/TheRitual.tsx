"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { EASE_OUT } from "@/lib/motion";

const steps = [
  {
    kanji: "篩",
    title: "Sift.",
    body: "Run 2g of matcha through a fine sieve to break clumps.",
  },
  {
    kanji: "注",
    title: "Pour.",
    body: "Add 60ml of water at 70°C — never boiling.",
  },
  {
    kanji: "点",
    title: "Whisk.",
    body: "Move the chasen in a rapid W motion, wrist loose.",
  },
  {
    kanji: "飲",
    title: "Enjoy.",
    body: "Drink within 60 seconds, while the foam is alive.",
  },
];

const bowlShades = [
  "radial-gradient(circle at 50% 45%, #eaf0d3 0%, #c5d1a8 35%, #7a8b5c 75%, #4a5d3a 100%)",
  "radial-gradient(circle at 50% 45%, #d9e2b9 0%, #aebe8c 35%, #6b7d4e 75%, #435334 100%)",
  "radial-gradient(circle at 50% 45%, #c5d1a8 0%, #94a476 35%, #5d6e48 75%, #3c4a2e 100%)",
  "radial-gradient(circle at 50% 45%, #afbd8e 0%, #7a8b5c 35%, #4a5d3a 75%, #2e3a23 100%)",
];

export function TheRitual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    setActiveStep(i);
  });

  const bowlScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const bowlRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="ritual-heading"
      className="relative bg-cream"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12 md:gap-16 lg:px-10">
          <div className="md:col-span-6">
            <motion.div
              style={{ scale: bowlScale, rotate: bowlRotate }}
              className="relative mx-auto aspect-square w-full max-w-[520px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full blur-3xl opacity-60 bg-matcha-light"
              />
              <motion.div
                role="img"
                aria-label="A chawan filled with whisked matcha"
                animate={{ background: bowlShades[activeStep] }}
                transition={{ duration: 1.4, ease: EASE_OUT }}
                className="relative aspect-square w-full rounded-full shadow-[0_60px_120px_-40px_rgba(74,93,58,0.6)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(250,247,240,0.25),transparent_55%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-[42%] rounded-full bg-cream/20 blur-md"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="md:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
              The Ritual &middot; 一服
            </p>
            <h2
              id="ritual-heading"
              className="mt-4 text-5xl leading-[1.05] text-matcha-deep md:text-6xl"
            >
              Four small movements.
              <br />
              <span className="italic text-matcha-mid">One good cup.</span>
            </h2>

            <ol className="relative mt-12 space-y-2" aria-live="polite">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                return (
                  <motion.li
                    key={step.title}
                    animate={{
                      opacity: isActive ? 1 : 0.28,
                    }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="relative flex gap-6 py-4"
                  >
                    <div className="flex flex-col items-center">
                      <span
                        aria-hidden="true"
                        className="serif text-3xl text-matcha-mid"
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-4">
                        <h3 className="serif text-4xl text-matcha-deep md:text-5xl">
                          {step.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="serif text-2xl text-matcha-light"
                        >
                          {step.kanji}
                        </span>
                      </div>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
                        {step.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <div className="mt-10 flex items-center gap-3" aria-hidden="true">
              {steps.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{
                    width: i === activeStep ? 32 : 12,
                    backgroundColor:
                      i === activeStep ? "var(--color-matcha-deep)" : "var(--color-line)",
                  }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="block h-[2px] rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
