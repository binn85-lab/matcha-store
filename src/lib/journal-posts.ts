export type JournalBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      intro?: string;
      items: string[];
    }
  | {
      type: "statement";
      text: string;
    };

export const journalPosts = [
  {
    slug: "why-matcha-feels-different-than-coffee",
    title: "Why Matcha Feels Different Than Coffee",
    eyebrow: "Journal",
    date: "May 2026",
    readTime: "5 min read",
    category: "Matcha & Focus",
    image: {
      src: "/journal/why-matcha-feels-different-than-coffee.png",
      alt: "Ceremonial matcha bowl, iced matcha latte, bamboo whisk, and matcha powder on a warm ritual table",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Matcha is not simply about caffeine. It is about how you want your energy to feel: calm, clear, focused, and balanced.",
    blocks: [
      {
        type: "paragraph",
        text: "If you have ever switched from coffee to matcha, you probably noticed something almost immediately: the energy feels different. Not stronger. Not weaker. Just smoother, calmer, and more balanced.",
      },
      {
        type: "paragraph",
        text: "Many people describe coffee as fast and intense, while matcha feels steady and focused. The reason comes from the unique combination of natural caffeine and L-theanine found in ceremonial grade matcha.",
      },
      {
        type: "paragraph",
        text: "Unlike coffee, which often delivers a quick spike of caffeine followed by an energy crash, matcha releases energy more gradually. This is because matcha contains L-theanine, a natural amino acid commonly associated with relaxation, calmness, and mental clarity. Together, caffeine and L-theanine create a balanced feeling of alertness without the jittery sensation many coffee drinkers experience.",
      },
      {
        type: "paragraph",
        text: "That is one of the main reasons why matcha has become increasingly popular among people who want sustained focus, deep work sessions, creative thinking, and a calmer daily routine.",
      },
      {
        type: "paragraph",
        text: "Another important difference is how matcha is consumed. With coffee, you brew the beans and drink the extracted liquid. With matcha, you consume the entire tea leaf in powdered form. This means matcha naturally contains more antioxidants, chlorophyll, and nutrients compared to traditional brewed green tea.",
      },
      {
        type: "paragraph",
        text: "High quality ceremonial matcha is also naturally rich in catechins, especially EGCG, which is known for its antioxidant properties. This makes matcha not only a popular productivity drink, but also part of many wellness and healthy lifestyle routines.",
      },
      {
        type: "list",
        intro: "Many people today use matcha as:",
        items: [
          "a coffee alternative",
          "a pre-work focus drink",
          "a calm morning ritual",
          "a creative companion",
          "a productivity booster",
          "a healthier caffeine source",
        ],
      },
      {
        type: "paragraph",
        text: "The ritual itself also contributes to the experience. Preparing matcha requires slowing down for a moment: whisking the tea, heating the water carefully, and creating a quiet pause before starting the day. Unlike grabbing coffee quickly during a busy morning, matcha often encourages mindfulness and intentional living.",
      },
      {
        type: "paragraph",
        text: "This combination of calm energy, mental clarity, and ritual is what makes matcha feel different from coffee.",
      },
      {
        type: "paragraph",
        text: "Another reason matcha feels smoother is because the caffeine absorption behaves differently in the body. Coffee often hits quickly and can increase anxiety for sensitive individuals. Matcha tends to feel gentler because the L-theanine helps moderate the stimulating effects of caffeine.",
      },
      {
        type: "list",
        intro: "For people who experience:",
        items: [
          "coffee crashes",
          "overthinking",
          "anxiety after caffeine",
          "difficulty concentrating",
          "inconsistent energy",
        ],
      },
      {
        type: "paragraph",
        text: "matcha can feel like a more balanced solution.",
      },
      {
        type: "list",
        intro: "That is why matcha is loved by:",
        items: [
          "designers",
          "writers",
          "entrepreneurs",
          "students",
          "creators",
          "remote workers",
          "athletes",
          "people practicing slow living",
        ],
      },
      {
        type: "paragraph",
        text: "Many people now keep matcha as part of their daily focus ritual. An iced matcha latte during work. A warm ceremonial bowl before journaling. A mindful break between meetings.",
      },
      {
        type: "statement",
        text: "In the end, matcha is not simply about caffeine. It is about how you want your energy to feel.",
      },
      {
        type: "statement",
        text: "Calm. Clear. Focused. Balanced.",
      },
      {
        type: "paragraph",
        text: "That is why matcha feels different than coffee.",
      },
    ],
  },
] as const;
