import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-line"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-cream-soft),var(--color-cream))]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-32">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.28em] text-matcha-mid">
            Est. Jakarta &middot; Sourced from Japan
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-5xl leading-[1.02] text-matcha-deep md:text-6xl lg:text-7xl"
          >
            A quiet laboratory
            <br />
            <span className="italic text-matcha-mid">for tea lovers.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Single-origin ceremonial and culinary matcha, stone-milled fresh
            and paired with tools that earn their place on your counter. Made
            for the ritual, made for the everyday.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/shop">Shop Matcha</LinkButton>
            <LinkButton href="/story" variant="ghost">
              Read the story
            </LinkButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            role="img"
            aria-label="A chawan of freshly whisked matcha beside a bamboo chasen, soft morning light"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-br from-matcha-light via-matcha-mid to-matcha-deep shadow-[0_30px_80px_-40px_rgba(74,93,58,0.45)]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,247,240,0.35),transparent_55%)]"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream/90">
              <span className="serif text-2xl italic">usucha</span>
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Photography placeholder
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
