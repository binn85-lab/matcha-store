"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
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

const PAPER_NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const INK_EASE = [0.25, 0.1, 0.25, 1] as const;

// Toggle to render a fixed overlay that reports scrollYProgress and
// each video's computed opacity. Left on until the crossfade is verified.
const DEBUG_OVERLAY = true;

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
  return <AnimatedRitual />;
}

function AnimatedRitual() {
  const outerScrollRef = useRef<HTMLElement>(null);
  const siftRef = useRef<HTMLVideoElement>(null);
  const pourRef = useRef<HTMLVideoElement>(null);
  const whiskRef = useRef<HTMLVideoElement>(null);
  const drinkRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerScrollRef,
    offset: ["start start", "end end"],
  });

  // Per-video crossfade opacities. DOM order = stacking:
  // sift (bottom) → pour → whisk → drink (top).
  const siftOpacity = useTransform(scrollYProgress, [0, 0.15, 0.28], [1, 1, 0]);
  const pourOpacity = useTransform(scrollYProgress, [0.22, 0.37, 0.53], [0, 1, 0]);
  const whiskOpacity = useTransform(scrollYProgress, [0.47, 0.62, 0.78], [0, 1, 0]);
  const drinkOpacity = useTransform(scrollYProgress, [0.72, 0.87, 1], [0, 1, 1]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#FAF7F0", "#F5F1DF", "#F0EEE0", "#FAF7F0"],
  );

  // Debug readouts (motion value → string, no React re-render).
  const progressText = useTransform(scrollYProgress, (v) => v.toFixed(3));
  const siftText = useTransform(siftOpacity, (v) => v.toFixed(2));
  const pourText = useTransform(pourOpacity, (v) => v.toFixed(2));
  const whiskText = useTransform(whiskOpacity, (v) => v.toFixed(2));
  const drinkText = useTransform(drinkOpacity, (v) => v.toFixed(2));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let next: number;
    if (v < 0.25) next = 0;
    else if (v < 0.5) next = 1;
    else if (v < 0.75) next = 2;
    else next = 3;
    setActiveStep(next);
  });

  // Mount log — proves the expected video paths are what we render.
  useEffect(() => {
    console.log(
      "[ritual] section mounted, video paths:",
      steps.map((s) => s.video),
    );
  }, []);

  // Play / pause on section intersect.
  useEffect(() => {
    const section = outerScrollRef.current;
    if (!section) return;
    const videos = [
      siftRef.current,
      pourRef.current,
      whiskRef.current,
      drinkRef.current,
    ];
    const observer = new IntersectionObserver(
      ([entry]) => {
        videos.forEach((v) => {
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

  // Kick off playback once each video has data.
  useEffect(() => {
    const videos = [
      siftRef.current,
      pourRef.current,
      whiskRef.current,
      drinkRef.current,
    ];
    videos.forEach((v) => {
      if (!v) return;
      const tryPlay = () => v.play().catch(() => undefined);
      if (v.readyState >= 2) tryPlay();
      else v.addEventListener("loadeddata", tryPlay, { once: true });
    });
  }, []);

  const activeKanji = steps[activeStep].kanji;
  const activeEnglish = steps[activeStep].english;
  const activeDescription = steps[activeStep].description;

  const onLoaded = (label: string) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.log(
      `[ritual] ${label} loadedmetadata:`,
      e.currentTarget.currentSrc || e.currentTarget.src,
    );
  };

  return (
    <section
      ref={outerScrollRef}
      aria-labelledby="ritual-heading"
      className="relative min-h-[400vh] overflow-hidden bg-cream lg:min-h-[500vh]"
    >
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{ backgroundImage: PAPER_NOISE_URL, backgroundSize: "200px 200px" }}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={`watermark-${activeStep}`}
              aria-hidden="true"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: INK_EASE }}
              className="serif block select-none text-[50vh] lg:text-[80vh]"
              style={{
                color: "rgba(74, 93, 58, 0.15)",
                filter: "blur(3px)",
                marginLeft: "-8%",
                lineHeight: "1",
                fontWeight: 400,
              }}
            >
              {activeKanji}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-6 py-8 lg:px-20 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="relative z-10 mb-4 max-w-4xl text-center lg:mb-8"
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
            className="relative z-10 mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black shadow-2xl lg:mb-8"
            style={{ maxWidth: "min(48rem, calc(38svh * 4 / 3))" }}
          >
            {/* bottom of stack */}
            <motion.div
              className="absolute inset-0 h-full w-full"
              style={{ opacity: siftOpacity }}
            >
              <video
                ref={siftRef}
                src="/ritual/ritual-sift.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={onLoaded("sift")}
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 h-full w-full"
              style={{ opacity: pourOpacity }}
            >
              <video
                ref={pourRef}
                src="/ritual/ritual-pour.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={onLoaded("pour")}
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 h-full w-full"
              style={{ opacity: whiskOpacity }}
            >
              <video
                ref={whiskRef}
                src="/ritual/ritual-whisk.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={onLoaded("whisk")}
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* top of stack */}
            <motion.div
              className="absolute inset-0 h-full w-full"
              style={{ opacity: drinkOpacity }}
            >
              <video
                ref={drinkRef}
                src="/ritual/ritual-drink.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={onLoaded("drink")}
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="relative z-10 w-full max-w-4xl lg:pl-32">
            <div
              aria-hidden="true"
              className="mb-4 flex items-center justify-center gap-3 lg:justify-start"
            >
              {steps.map((_, i) => {
                const active = i === activeStep;
                return (
                  <span
                    key={i}
                    className={`block transition-all duration-500 ease-in-out ${
                      active
                        ? "h-[2px] w-10 bg-matcha-deep opacity-100"
                        : "h-px w-5 bg-matcha-mid opacity-25"
                    }`}
                  />
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${activeStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                role="group"
                aria-current="step"
                aria-label={`Step ${activeStep + 1}: ${activeEnglish}`}
                className="flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:gap-10 lg:text-left"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.2, ease: INK_EASE, delay: 0.2 }}
                  className="serif block flex-shrink-0 text-[100px] leading-none text-matcha-deep lg:text-[180px]"
                  style={{
                    filter: "drop-shadow(1px 1px 0 rgba(74,93,58,0.15))",
                    fontWeight: 400,
                  }}
                >
                  {activeKanji}
                </motion.span>

                <div className="flex flex-col items-center lg:items-start">
                  <p className="text-lg font-medium uppercase tracking-[0.3em] text-matcha-mid lg:text-2xl">
                    {activeEnglish}
                  </p>
                  <p className="serif mt-3 max-w-md text-base leading-relaxed text-ink lg:text-lg">
                    {activeDescription}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {DEBUG_OVERLAY ? (
        <div className="fixed right-4 top-4 z-[60] rounded bg-black/70 p-2 font-mono text-[11px] leading-4 text-white">
          <div>
            progress: <motion.span>{progressText}</motion.span>
          </div>
          <div>
            sift: <motion.span>{siftText}</motion.span>
          </div>
          <div>
            pour: <motion.span>{pourText}</motion.span>
          </div>
          <div>
            whisk: <motion.span>{whiskText}</motion.span>
          </div>
          <div>
            drink: <motion.span>{drinkText}</motion.span>
          </div>
          <div>step: {activeStep + 1}</div>
        </div>
      ) : null}
    </section>
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
