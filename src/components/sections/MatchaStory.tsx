const grades = [
  {
    kanji: "濃茶",
    label: "Ceremonial",
    romaji: "Koicha · Usucha",
    body: "Shade-grown first-harvest tencha, de-stemmed and stone-milled. A bright, layered cup that rewards slow attention — best whisked with water alone.",
    notes: ["First harvest", "Stone-milled", "Whisk with water"],
  },
  {
    kanji: "料理",
    label: "Culinary",
    romaji: "Ryori-yō",
    body: "A bolder, rounder matcha built for milk, heat, and sweetness. Honest in a latte, resilient in a bake — the cup you reach for every morning.",
    notes: ["Full-bodied", "Latte & bake", "Daily ritual"],
  },
];

export function MatchaStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="border-y border-line bg-cream-soft"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.28em] text-matcha-mid">
              The Matcha Story
            </p>
            <h2
              id="story-heading"
              className="mt-3 text-4xl leading-tight text-matcha-deep md:text-5xl"
            >
              Two grades.
              <br />
              <span className="italic">One leaf, two rituals.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Matcha isn&rsquo;t one thing. A ceremonial cup asks for patience
              and water; a culinary tin asks for milk and mornings. We carry
              both because both deserve to be made well.
            </p>
          </div>

          <div className="grid gap-6 md:col-span-7 md:grid-cols-2">
            {grades.map((g) => (
              <article
                key={g.label}
                className="relative flex flex-col rounded-sm border border-line bg-cream p-8 transition-colors hover:border-matcha-mid"
              >
                <div className="flex items-baseline justify-between">
                  <span
                    aria-hidden="true"
                    className="serif text-5xl text-matcha-light"
                  >
                    {g.kanji}
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    {g.romaji}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl text-matcha-deep">{g.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {g.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-ink-soft"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
