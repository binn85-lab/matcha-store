import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "The Matcha Story | Homelab",
  description:
    "Explore why ceremonial matcha has become a daily ritual for calm focus, slow mornings, and modern wellness.",
};

const storyParagraphs = [
  "People often think matcha is only about caffeine or aesthetics. But the reason many people return to matcha every day is the feeling it creates.",
  "A slower morning. A calmer mind. A more balanced kind of energy.",
  "Unlike coffee that can sometimes feel intense or overwhelming, ceremonial matcha is loved for its smooth and steady focus. The combination of natural caffeine and L-theanine helps create a gentle energy that feels more stable throughout the day.",
  "For many people, making matcha becomes part of a daily ritual. The sound of the bamboo whisk. The earthy aroma of green tea. The quiet moment before work begins.",
  "In a world that constantly moves fast, these small routines start to matter more.",
  "Matcha is also appreciated for its rich antioxidants and wellness benefits. From supporting mental clarity to becoming a popular alternative to coffee, premium Japanese matcha has become part of modern lifestyles focused on mindfulness, productivity, and intentional living.",
  "Some enjoy a traditional warm bowl of matcha in the morning. Others prefer an iced matcha latte during work, after the gym, or while journaling at home. The ritual looks different for everyone, but the feeling is often the same: calm, focused, and grounded.",
  "Good ceremonial grade matcha should taste smooth, creamy, naturally umami, and never overly bitter. The experience is not only about the drink itself, but also about slowing down enough to enjoy the process.",
  "Today, matcha has become more than a trend. It has become part of modern wellness culture, creative routines, slow living, and everyday self-care.",
  "Sometimes, a simple cup of matcha is not about productivity at all. It is simply about creating a quiet moment for yourself.",
];

const storyNotes = [
  "Calm focus",
  "L-theanine energy",
  "Daily ritual",
  "Premium Japanese matcha",
  "Slow living",
];

export default function StoryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
                  The Matcha Story
                </p>
                <h1 className="serif mt-5 text-5xl leading-[1.02] text-matcha-deep md:text-7xl">
                  A quiet ritual for
                  <span className="italic text-matcha-mid"> modern days.</span>
                </h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                Matcha is more than a drink. It is a small pause, a slower
                rhythm, and a gentler way to begin again.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-sm bg-cream-soft">
              <Image
                src="/story/homelab-matcha-ritual.png"
                alt="Homelab matcha ritual collage with tea fields, matcha powder, bamboo whisk, bowls, and iced matcha latte"
                width={3072}
                height={2048}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[280px_minmax(0,760px)] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs uppercase tracking-[0.24em] text-matcha-mid">
                  Why people return
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 lg:block lg:space-y-2">
                  {storyNotes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full border border-line bg-cream-soft px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-ink-soft lg:inline-block"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-matcha-deep bg-matcha-deep px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
                >
                  Shop matcha
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </aside>

              <article className="max-w-3xl">
                <div className="space-y-7 text-lg leading-relaxed text-ink-soft md:text-xl md:leading-relaxed">
                  {storyParagraphs.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={
                        index === 1
                          ? "serif text-3xl leading-snug text-matcha-deep md:text-4xl"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
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
