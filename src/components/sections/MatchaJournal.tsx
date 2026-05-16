"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { journalPosts } from "@/lib/journal-posts";
import { EASE_OUT, revealViewport } from "@/lib/motion";

export function MatchaJournal() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const featuredPosts = journalPosts.slice(0, 4);

  const scrollByCard = (direction: "previous" | "next") => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const cardWidth = scroller.firstElementChild?.clientWidth ?? 320;
    const gap = 24;
    scroller.scrollBy({
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id="matcha-journal"
      aria-labelledby="matcha-journal-heading"
      className="overflow-hidden border-t border-line bg-cream px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: EASE_OUT },
                },
              }}
              className="text-xs uppercase tracking-[0.3em] text-matcha-mid"
            >
              Homelab Journal
            </motion.p>
            <motion.h2
              id="matcha-journal-heading"
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: EASE_OUT },
                },
              }}
              className="mt-5 text-5xl leading-[1.03] text-matcha-deep md:text-6xl"
            >
              Matcha Journal
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, ease: EASE_OUT },
                },
              }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
            >
              Notes on calm energy, ceremonial matcha, better preparation, and
              daily rituals for a slower cup.
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: EASE_OUT, delay: 0.08 },
              },
            }}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              aria-label="Scroll journal cards left"
              onClick={() => scrollByCard("previous")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-matcha-deep text-matcha-deep transition-colors hover:bg-matcha-deep hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Scroll journal cards right"
              onClick={() => scrollByCard("next")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-matcha-deep text-cream transition-colors hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-6 mt-12 flex snap-x gap-5 overflow-x-auto px-6 pb-4 scroll-smooth md:gap-6 lg:mx-0 lg:px-0"
        >
          {featuredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/journal#${post.slug}`}
              className="group w-[78vw] shrink-0 snap-start outline-none sm:w-[360px] lg:w-[calc((100%_-_72px)/4)]"
              aria-label={`Read journal article: ${post.title}`}
            >
              <article className="h-full">
                <div className="relative aspect-[1.14] overflow-hidden rounded-sm bg-cream-soft">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 360px, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                  <span className="absolute left-4 top-4 text-sm font-semibold text-cream">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="pt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-matcha-mid">
                    {post.category} / {post.readTime}
                  </p>
                  <h3 className="mt-3 text-xl leading-tight text-matcha-deep transition-colors group-hover:text-matcha-mid group-focus-visible:text-matcha-mid">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <Link
            href="/journal"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-matcha-deep px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
          >
            Explore the journal
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
