"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
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
        (conn?.effectiveType ? ["2g", "slow-2g"].includes(conn.effectiveType) : false),
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
  const inViewRef = useRef(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Per-video opacity curves (fixed number of hooks, not a loop).
  const op0 = useTransform(scrollYProgress, [0, 0.125, 0.3], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.2, 0.375, 0.55], [0, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.45, 0.625, 0.8], [0, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.7, 0.875, 1], [0, 1, 1]);
  const videoOpacities: MotionValue<number>[] = [op0, op1, op2, op3];

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(3, Math.max(0, Math.floor(p * steps.length)));
    if (i !== activeStep) setActiveStep(i);
  });

  // Pause offscreen, play when in view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        videoRefs.current.forEach((v) => {
          if (!v) return;
          if (entry.isIntersecting) {
            v.play().catch(() => undefined);
          } else {
            v.pause();
          }
        });
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Kick off autoplay once videos can play.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      const tryPlay = () => v.play().catch(() => undefined);
      if (v.readyState >= 2) tryPlay();
      else v.addEventListener("loadeddata", tryPlay, { once: true });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ritual-heading"
      className="relative bg-cream min-h-[400vh] lg:min-h-[500vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center px-4 py-10 lg:px-20 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="mb-6 max-w-4xl text-center lg:mb-10"
        >
          <h2
            id="ritual-heading"
            className="serif text-4xl leading-tight text-matcha-deep lg:text-6xl"
          >
            Four small movements.
          </h2>
          <p className="serif mt-1 text-3xl italic text-matcha-mid lg:text-5xl">
            One good cup.
          </p>
        </motion.div>

        <div
          className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black shadow-2xl lg:mb-12"
          style={{ maxWidth: "min(56rem, calc(52svh * 4 / 3))" }}
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
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-cream/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]"
          />
        </div>

        <div className="flex w-full max-w-5xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-16">
          <ProgressIndicator activeStep={activeStep} />

          <ol
            aria-label="The four movements of the ritual"
            className="relative grid w-full grid-cols-1 grid-rows-1"
          >
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <li
                  key={step.english}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${i + 1}: ${step.english}`}
                  style={{ opacity: isActive ? 1 : 0.15 }}
                  className="col-start-1 row-start-1 flex flex-col items-center gap-3 transition-opacity duration-500 ease-in-out lg:flex-row lg:items-start lg:gap-10"
                >
                  <span
                    aria-hidden="true"
                    className="serif block text-[100px] leading-none text-matcha-deep lg:min-w-[240px] lg:text-[180px]"
                    style={{ fontWeight: 400 }}
                  >
                    {step.kanji}
                  </span>
                  <div className="flex flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left">
                    <span className="text-lg font-medium uppercase tracking-[0.3em] text-matcha-mid lg:text-2xl">
                      {step.english}
                    </span>
                    <p className="serif mt-3 max-w-md text-base leading-relaxed text-ink lg:text-lg">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProgressIndicator({ activeStep }: { activeStep: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-row gap-3 lg:flex-col lg:pt-6"
    >
      {steps.map((_, i) => {
        const active = i === activeStep;
        return (
          <span
            key={i}
            className={`block transition-all duration-[400ms] ease-in-out ${
              active
                ? "h-[2px] w-10 bg-matcha-deep opacity-100"
                : "h-px w-5 bg-matcha-mid opacity-25"
            }`}
          />
        );
      })}
    </div>
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
            className="serif text-4xl leading-tight text-matcha-deep lg:text-6xl"
          >
            Four small movements.
          </h2>
          <p className="serif mt-1 text-3xl italic text-matcha-mid lg:text-5xl">
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
