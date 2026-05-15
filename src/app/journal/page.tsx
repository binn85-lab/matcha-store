import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { journalPosts } from "@/lib/journal-posts";

const post = journalPosts[0];

export const metadata: Metadata = {
  title: "Journal | Homelab",
  description:
    "Read Homelab journal notes on matcha, calm focus, coffee alternatives, and everyday rituals.",
};

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
                  {post.eyebrow}
                </p>
                <h1 className="serif mt-5 text-5xl leading-[1.02] text-matcha-deep md:text-7xl">
                  Why matcha feels
                  <span className="italic text-matcha-mid"> different.</span>
                </h1>
              </div>
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  {post.category} / {post.readTime}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-sm bg-cream-soft shadow-[0_36px_100px_-65px_rgba(74,93,58,0.5)]">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[280px_minmax(0,760px)] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs uppercase tracking-[0.24em] text-matcha-mid">
                  Featured article
                </p>
                <h2 className="serif mt-4 text-3xl leading-tight text-matcha-deep">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink-soft">
                  {post.date}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Calm energy", "L-theanine", "Coffee alternative", "Daily focus"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-cream-soft px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-ink-soft"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-matcha-deep bg-matcha-deep px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
                >
                  Explore matcha
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>

              <article className="max-w-3xl">
                <h2 className="serif text-4xl leading-tight text-matcha-deep md:text-5xl">
                  {post.title}
                </h2>
                <div className="mt-9 space-y-7 text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
                  {post.blocks.map((block, index) => {
                    if (block.type === "statement") {
                      return (
                        <p
                          key={`${block.type}-${index}`}
                          className="serif text-3xl leading-snug text-matcha-deep md:text-4xl"
                        >
                          {block.text}
                        </p>
                      );
                    }

                    if (block.type === "list") {
                      return (
                        <div key={`${block.type}-${index}`}>
                          {block.intro ? <p>{block.intro}</p> : null}
                          <ul className="mt-4 grid gap-2 text-base md:grid-cols-2 md:text-lg">
                            {block.items.map((item) => (
                              <li key={item} className="flex items-baseline gap-3">
                                <span
                                  aria-hidden="true"
                                  className="text-matcha-mid"
                                >
                                  ·
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    return <p key={`${block.type}-${index}`}>{block.text}</p>;
                  })}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
