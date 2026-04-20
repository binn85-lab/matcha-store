"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { EASE_OUT, revealViewport } from "@/lib/motion";

interface Step {
  kanji: string;
  english: string;
  description: string;
  video: string;
}

const steps: Step[] = [
  {
    kanji: "篩",
    english: "Sift",
    description:
      "2 – 5 grams of matcha, sesuai selera, through a fine sieve. Clumps dissolve, the powder breathes.",
    video: "/ritual/ritual-sift.mp4",
  },
  {
    kanji: "注",
    english: "Pour",
    description:
      "60ml of water at 70°C. Never boiling — the leaf is alive, honor it.",
    video: "/ritual/ritual-pour.mp4",
  },
  {
    kanji: "点",
    english: "Whisk",
    description:
      "Rapid W motion, wrist loose. Not a stir — a wake-up call for the tea.",
    video: "/ritual/ritual-whisk.mp4",
  },
  {
    kanji: "飲",
    english: "Drink",
    description:
      "Within 60 seconds, while the foam is still alive. Hold the bowl with both hands.",
    video: "/ritual/ritual-drink.mp4",
  },
];

interface TheRitualProps {
  posters?: Array<string | null>;
}

export function TheRitual({ posters = [] }: TheRitualProps) {
  const reduced = useReducedMotion();
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    setSlow(
      !!conn?.saveData ||
        (conn?.effectiveType
          ? ["2g", "slow-2g"].includes(conn.effectiveType)
          : false),
    );
  }, []);

  if (reduced || slow) {
    return <StaticRitual posters={posters} />;
  }
  return <AnimatedRitual posters={posters} />;
}

function AnimatedRitual({ posters }: { posters: Array<string | null> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 1,
  });
  const trackX = useTransform(smoothProgress, [0, 1], ["0%", "-300%"]);

  // Per-video opacity curves (fixed hook count).
  const sift = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const pour = useTransform(scrollYProgress, [0.2, 0.35, 0.55], [0, 1, 0]);
  const whisk = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 1, 0]);
  const drink = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const videoOpacities: MotionValue<number>[] = [sift, pour, whisk, drink];

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#FAF7F0", "#F5F1DF", "#F0EEE0", "#FAF7F0"],
  );

  const hintOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    if (i !== activeStep) setActiveStep(i);
  });

  // IntersectionObserver → pause all videos when section off-screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        videoRefs.current.forEach((v) => {
          if (!v) return;
          if (entry.isIntersecting) v.play().catch(() => undefined);
          else v.pause();
        });
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay when the videos can play.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      const tryPlay = () => v.play().catch(() => undefined);
      if (v.readyState >= 2) tryPlay();
      else v.addEventListener("loadeddata", tryPlay, { once: true });
    });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="ritual-heading"
      style={{ backgroundColor }}
      className="relative min-h-[400vh] lg:min-h-[500vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative flex h-full flex-col items-center justify-center px-4 py-10 lg:px-20 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="z-10 mb-6 max-w-4xl text-center lg:mb-10"
          >
            <h2
              id="ritual-heading"
              className="serif text-3xl leading-tight text-matcha-deep lg:text-6xl"
            >
              Four small movements.
            </h2>
            <p className="serif mt-1 text-2xl italic text-matcha-mid lg:text-5xl">
              One good cup.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black shadow-2xl lg:mb-10"
            style={{ maxWidth: "min(48rem, calc(40svh * 4 / 3))" }}
          >
            {steps.map((step, i) => (
              <motion.video
                key={step.video}
                ref={(el: HTMLVideoElement | null) => {
                  videoRefs.current[i] = el;
                }}
                src={step.video}
                poster={posters[i] ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{ opacity: videoOpacities[i] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12px] bg-black lg:h-[20px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[12px] bg-black lg:h-[20px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.35)" }}
            />
          </motion.div>

          <div className="relative h-[320px] w-full max-w-5xl overflow-hidden lg:h-[280px]">
            <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 gap-3">
              {steps.map((_, i) => {
                const active = i === activeStep;
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`block transition-all duration-500 ease-in-out ${
                      active
                        ? "h-[2px] w-12 bg-matcha-deep opacity-100"
                        : "h-px w-6 bg-matcha-mid opacity-25"
                    }`}
                  />
                );
              })}
            </div>

            <motion.ol
              aria-label="The four movements of the ritual"
              style={{ x: trackX }}
              className="absolute inset-0 m-0 list-none p-0"
            >
              {steps.map((step, i) => (
                <StepCard
                  key={step.english}
                  step={step}
                  index={i}
                  isActive={i === activeStep}
                />
              ))}
            </motion.ol>
          </div>

          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-matcha-mid lg:bottom-6"
            aria-hidden="true"
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block"
            >
              ↓
            </motion.span>
            Continue
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function StepCard({
  step,
  index,
  isActive,
}: {
  step: Step;
  index: number;
  isActive: boolean;
}) {
  return (
    <li
      aria-current={isActive ? "step" : undefined}
      aria-label={`Step ${index + 1}: ${step.english}`}
      style={{ left: `${index * 100}%` }}
      className="absolute inset-y-0 flex w-full items-center justify-center px-4 lg:px-8"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 pt-10 text-center lg:flex-row lg:items-center lg:gap-20 lg:pt-0 lg:text-left">
        <motion.div
          animate={{ scale: isActive ? 1 : 1.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex-shrink-0"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              aria-hidden="true"
              className="serif absolute inset-0 block translate-x-2 translate-y-2 text-[100px] leading-none text-matcha-deep/10 blur-sm lg:text-[200px]"
              style={{ fontWeight: 400 }}
            >
              {step.kanji}
            </span>
            <span
              aria-hidden="true"
              className="serif relative block text-[100px] leading-none text-matcha-deep lg:text-[200px]"
              style={{ fontWeight: 400 }}
            >
              {step.kanji}
            </span>
          </motion.div>
        </motion.div>

        <div className="flex flex-1 flex-col items-center text-center lg:max-w-md lg:items-start lg:text-left">
          <div className="relative inline-block pb-1">
            <p className="text-lg font-medium uppercase tracking-[0.3em] text-matcha-mid lg:text-2xl">
              {step.english}
            </p>
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{
                duration: 0.8,
                delay: isActive ? 0.3 : 0,
                ease: "easeOut",
              }}
              className="absolute inset-x-0 bottom-0 block h-px origin-left bg-matcha-mid"
            />
          </div>
          <p className="serif mt-4 max-w-md text-base leading-relaxed text-ink lg:text-lg">
            {step.description}
          </p>
        </div>
      </div>
    </li>
  );
}

function StaticRitual({ posters }: { posters: Array<string | null> }) {
  return (
    <section
      aria-labelledby="ritual-heading-static"
      className="bg-cream px-6 py-32 lg:px-20 lg:py-44"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2
            id="ritual-heading-static"
            className="serif text-3xl leading-tight text-matcha-deep lg:text-6xl"
          >
            Four small movements.
          </h2>
          <p className="serif mt-1 text-2xl italic text-matcha-mid lg:text-5xl">
            One good cup.
          </p>
        </div>
        <ol className="mt-20 space-y-16 lg:space-y-24">
          {steps.map((step, i) => (
            <li
              key={step.english}
              aria-label={`Step ${i + 1}: ${step.english}`}
              className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12"
            >
              <div
                aria-hidden="true"
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black lg:w-[45%]"
              >
                {posters[i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={posters[i] as string}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="serif text-9xl text-cream/40">
                      {step.kanji}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <span
                  aria-hidden="true"
                  className="serif block text-[100px] leading-none text-matcha-deep lg:text-[160px]"
                >
                  {step.kanji}
                </span>
                <span className="mt-4 text-lg font-medium uppercase tracking-[0.3em] text-matcha-mid lg:text-2xl">
                  {step.english}
                </span>
                <p className="serif mt-3 max-w-md text-base leading-relaxed text-ink lg:text-lg">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
