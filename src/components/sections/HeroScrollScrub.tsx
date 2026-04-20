"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { useSmartShopScroll } from "@/lib/use-smart-shop-scroll";

type Mode = "scrub" | "autoplay" | "static";

const beats = [
  {
    eyebrow: "Est. Jakarta · Sourced from Japan",
    headline: "A quiet laboratory",
    sub: "for tea lovers.",
    start: 0,
    peak: 0.1,
    end: 0.3,
  },
  {
    eyebrow: "The Ritual",
    headline: "Every bowl begins",
    sub: "with stillness.",
    start: 0.3,
    peak: 0.5,
    end: 0.66,
  },
  {
    eyebrow: "Craft",
    headline: "Whisked by hand,",
    sub: "never rushed.",
    start: 0.66,
    peak: 0.85,
    end: 1,
    sticky: true,
  },
] as const;

export function HeroScrollScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("scrub");
  const [videoErrored, setVideoErrored] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Client-only capability detection.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    const slow =
      !!conn?.saveData ||
      (conn?.effectiveType ? ["2g", "slow-2g"].includes(conn.effectiveType) : false);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);

    if (reduced || slow) setMode("static");
    else if (iOS) setMode("autoplay");
    else setMode("scrub");
  }, []);

  // Scrub: drive video.currentTime from scroll, throttled to rAF.
  useEffect(() => {
    if (mode !== "scrub" || videoErrored) return;
    const video = videoRef.current;
    if (!video) return;

    let rafId: number | null = null;
    let target = 0;
    let ready = false;

    const onReady = () => {
      ready = true;
      try {
        video.pause();
      } catch {}
    };
    const tick = () => {
      rafId = null;
      if (!ready || !video.duration) return;
      if (Math.abs(video.currentTime - target) > 0.02) {
        try {
          video.currentTime = target;
        } catch {}
      }
    };

    video.addEventListener("loadedmetadata", onReady);
    if (video.readyState >= 1) onReady();

    const unsubscribe = scrollYProgress.on("change", (p) => {
      if (!ready || !video.duration) return;
      target = Math.max(0, Math.min(video.duration, p * video.duration));
      if (rafId === null) rafId = requestAnimationFrame(tick);
    });

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      unsubscribe();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mode, videoErrored, scrollYProgress]);

  // Autoplay fallback for iOS.
  useEffect(() => {
    if (mode !== "autoplay" || videoErrored) return;
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    const tryPlay = () => video.play().catch(() => undefined);
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });
  }, [mode, videoErrored]);

  if (mode === "static") {
    return <StaticHero videoErrored={videoErrored} />;
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-scrub-heading"
      className="relative h-[200vh] md:h-[300vh]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-matcha-deep">
        {!videoErrored ? (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            aria-hidden="true"
            onError={() => setVideoErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero/hero-scroll-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url(/hero/hero-poster.jpg)" }}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,20,10,0.55)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top_right,rgba(10,20,10,0.65),transparent_55%)]"
        />

        <ScrubProgressBar progress={scrollYProgress} />

        <h1 id="hero-scrub-heading" className="sr-only">
          Homelab — a quiet laboratory for tea lovers
        </h1>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-16 pl-8 md:px-12 md:pb-24 lg:pb-32 lg:pl-32">
          {beats.map((beat, i) => (
            <Beat
              key={i}
              scrollYProgress={scrollYProgress}
              eyebrow={beat.eyebrow}
              headline={beat.headline}
              sub={beat.sub}
              start={beat.start}
              peak={beat.peak}
              end={beat.end}
              sticky={"sticky" in beat ? beat.sticky : false}
            />
          ))}

          <CtaRow scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function Beat({
  scrollYProgress,
  eyebrow,
  headline,
  sub,
  start,
  peak,
  end,
  sticky = false,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  eyebrow: string;
  headline: string;
  sub: string;
  start: number;
  peak: number;
  end: number;
  sticky?: boolean;
}) {
  const opacity = useTransform(
    scrollYProgress,
    sticky ? [start, peak] : [start, peak, end],
    sticky ? [0, 1] : [0, 1, 0],
  );
  const y = useTransform(scrollYProgress, [start, peak, end], [30, 0, -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-6 bottom-24 md:inset-x-12 md:bottom-36 lg:bottom-48 lg:left-32 lg:right-auto lg:max-w-3xl"
    >
      <p className="text-[10px] uppercase tracking-[0.32em] text-cream/90 md:text-xs">
        {eyebrow}
      </p>
      <p className="serif mt-5 text-5xl leading-[0.98] text-cream md:text-7xl lg:text-8xl">
        {headline}
      </p>
      <p className="serif mt-2 text-5xl italic leading-[0.98] text-cream/90 md:text-7xl lg:text-8xl">
        {sub}
      </p>
    </motion.div>
  );
}

function CtaRow({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const y = useTransform(scrollYProgress, [0.78, 0.9], [20, 0]);
  const pointerEvents = useTransform(scrollYProgress, (p) =>
    p > 0.82 ? "auto" : "none",
  );
  const onShop = useSmartShopScroll();

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-x-6 bottom-8 flex flex-wrap gap-3 md:inset-x-12 md:bottom-10 lg:bottom-16 lg:left-32 lg:right-auto"
    >
      <Link
        href="/shop"
        prefetch={false}
        onClick={onShop}
        className="inline-flex items-center justify-center rounded-full bg-matcha-deep px-8 py-3 text-sm tracking-wide text-cream shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.03] hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        Shop Matcha
      </Link>
      <Link
        href="/story"
        prefetch={false}
        className="inline-flex items-center justify-center rounded-full border border-cream/70 px-8 py-3 text-sm tracking-wide text-cream backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-cream hover:bg-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        Read the Story
      </Link>
    </motion.div>
  );
}

function ScrubProgressBar({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(progress, "change", (p) => {
    setVisible(p > 0 && p < 1);
  });

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 top-0 z-20 h-[2px] bg-cream/20 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="h-full origin-left bg-matcha-deep"
      />
    </div>
  );
}

function StaticHero({ videoErrored: _videoErrored }: { videoErrored: boolean }) {
  const onShop = useSmartShopScroll();
  return (
    <section
      aria-labelledby="hero-static-heading"
      className="relative h-[100svh] w-full overflow-hidden bg-matcha-deep"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/hero-poster.jpg)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,20,10,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top_right,rgba(10,20,10,0.65),transparent_55%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}
        className="absolute inset-x-6 bottom-16 md:inset-x-12 md:bottom-24 lg:bottom-32 lg:left-32 lg:right-auto lg:max-w-3xl"
      >
        <p className="text-[10px] uppercase tracking-[0.32em] text-cream/90 md:text-xs">
          Craft
        </p>
        <h1
          id="hero-static-heading"
          className="serif mt-5 text-5xl leading-[0.98] text-cream md:text-7xl lg:text-8xl"
        >
          Whisked by hand,
          <span className="block italic text-cream/90">never rushed.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/shop"
            prefetch={false}
            onClick={onShop}
            className="inline-flex items-center justify-center rounded-full bg-matcha-deep px-8 py-3 text-sm tracking-wide text-cream shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-matcha-mid"
          >
            Shop Matcha
          </Link>
          <Link
            href="/story"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full border border-cream/70 px-8 py-3 text-sm tracking-wide text-cream hover:bg-cream/10"
          >
            Read the Story
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
