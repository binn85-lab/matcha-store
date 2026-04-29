"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const steps = [
  {
    kanji: "篩",
    english: "SIFT",
    description: "2 – 5 grams of matcha, sesuai selera, through a fine sieve. Clumps dissolve, the powder breathes.",
    video: "/ritual/ritual-sift.mp4",
    poster: "/ritual/ritual-sift-poster.png",
  },
  {
    kanji: "注",
    english: "POUR",
    description: "60ml of water at 70°C. Never boiling — the leaf is alive, honor it.",
    video: "/ritual/ritual-pour.mp4",
    poster: "/ritual/ritual-pour-poster.png",
  },
  {
    kanji: "点",
    english: "WHISK",
    description: "Rapid W motion, wrist loose. Not a stir — a wake-up call for the tea.",
    video: "/ritual/ritual-whisk.mp4",
    poster: "/ritual/ritual-whisk-poster.png",
  },
  {
    kanji: "飲",
    english: "DRINK",
    description: "Within 60 seconds, while the foam is still alive. Hold the bowl with both hands.",
    video: "/ritual/ritual-drink.mp4",
    poster: "/ritual/ritual-drink-poster.png",
  },
]

export default function RitualSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.25) setActiveStep(0)
    else if (v < 0.5) setActiveStep(1)
    else if (v < 0.75) setActiveStep(2)
    else setActiveStep(3)
  })

  // Only the active video plays — avoids browser autoplay throttling when
  // multiple <video autoplay> elements are on the same page. The others sit
  // paused with their poster frame visible, so the crossfade still looks smooth.
  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === activeStep) {
        el.currentTime = 0
        const p = el.play()
        if (p && typeof p.catch === "function") p.catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [activeStep])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF7F0]"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 lg:px-20">

        {/* Background kanji watermark */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          animate={{ x: `${-5 - activeStep * 3}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="text-[40vw] lg:text-[32vw] leading-none font-serif text-[#4A5D3A]/8 blur-[2px]">
            {steps[activeStep].kanji}
          </div>
        </motion.div>

        {/* Heading */}
        <div className="relative z-10 text-center mb-8 lg:mb-10">
          <h2 className="text-4xl lg:text-6xl font-serif text-[#4A5D3A] leading-tight">
            Four small movements.
          </h2>
          <p className="text-3xl lg:text-5xl font-serif italic text-[#7A8B5C] mt-1">
            One good cup.
          </p>
        </div>

        {/* Video container — centered, 4:3 horizontal, clean */}
        <div className="relative z-10 w-full max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-black mb-8 lg:mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.english}
              className="absolute inset-0 w-full h-full"
              animate={{ opacity: activeStep === i ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={step.video}
                poster={step.poster}
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Step content below video */}
        <div className="relative z-10 w-full max-w-4xl flex items-center justify-center gap-8 lg:gap-16">

          {/* Progress indicator */}
          <div className="hidden lg:flex flex-col gap-3">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-[2px] bg-[#4A5D3A]"
                animate={{
                  width: activeStep === i ? 48 : 24,
                  opacity: activeStep === i ? 1 : 0.25,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Active step — kanji + text */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-6 lg:gap-12"
          >
            <div className="text-[80px] lg:text-[140px] font-serif text-[#4A5D3A] leading-none flex-shrink-0">
              {steps[activeStep].kanji}
            </div>
            <div className="flex-1 max-w-md">
              <p className="text-lg lg:text-xl uppercase tracking-[0.3em] text-[#7A8B5C] font-medium mb-3">
                {steps[activeStep].english}
              </p>
              <p className="text-base lg:text-lg font-serif leading-relaxed text-neutral-800">
                {steps[activeStep].description}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dev debug overlay — remove after confirming it works */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed top-4 right-4 bg-black/80 text-white text-xs p-3 rounded font-mono z-[9999] space-y-1 pointer-events-none">
            <div>step: {activeStep} ({steps[activeStep].english})</div>
            <div>scroll: <motion.span>{scrollYProgress}</motion.span></div>
          </div>
        )}
      </div>
    </section>
  )
}
