"use client";

import { ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28"
    >
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha-mid">
            Surat kabar &middot; Newsletter
          </p>
          <h2
            id="newsletter-heading"
            className="mt-3 text-4xl leading-tight text-matcha-deep md:text-5xl"
          >
            Seduhan baru,
            <br />
            <span className="italic">fresh brews in your inbox.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
            Sekali sebulan — kami kirim cerita panen, resep, dan akses awal ke
            stok terbatas. Tidak ada spam, tidak ada basa-basi.
            <span className="mt-2 block text-sm italic text-matcha-mid">
              One email a month — harvest notes, recipes, and early access.
              No noise.
            </span>
          </p>
        </div>

        <form
          aria-label="Newsletter signup"
          className="md:col-span-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-3 rounded-sm border border-line bg-cream-soft p-3 sm:flex-row sm:items-center">
            <input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full flex-1 bg-transparent px-4 py-2 text-base text-ink placeholder:text-ink-soft/60 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-matcha-deep px-6 py-3 text-sm tracking-wide text-cream transition-colors hover:bg-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream-soft"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            Dengan mendaftar, Anda setuju menerima email dari Homelab. /
            By subscribing you agree to receive emails from Homelab.
          </p>
        </form>
      </div>
    </section>
  );
}
