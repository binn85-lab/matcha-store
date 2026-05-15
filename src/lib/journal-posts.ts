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
  {
    slug: "why-good-matcha-shouldnt-taste-bitter",
    title: "Why Good Matcha Shouldn't Taste Bitter",
    eyebrow: "Journal",
    date: "May 2026",
    readTime: "5 min read",
    category: "Matcha Quality",
    image: {
      src: "/journal/why-good-matcha-shouldnt-taste-bitter.png",
      alt: "A warm bowl of ceremonial matcha with bamboo whisk, water glass, and matcha powder in soft morning light",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "High quality ceremonial matcha should feel smooth, creamy, naturally sweet, and rich in umami, not harsh or unpleasant.",
    blocks: [
      {
        type: "paragraph",
        text: "One of the biggest misconceptions about matcha is that it is supposed to taste bitter.",
      },
      {
        type: "paragraph",
        text: "In reality, high quality ceremonial grade matcha should taste smooth, creamy, naturally sweet, and rich in umami, not harsh or unpleasant.",
      },
      {
        type: "paragraph",
        text: "If your matcha tastes extremely bitter, grassy, or overly astringent, there is usually a reason behind it.",
      },
      {
        type: "paragraph",
        text: "The quality of the tea leaves matters enormously. Premium Japanese ceremonial matcha is made from carefully shade-grown tea leaves that are harvested young and processed delicately to preserve their vibrant green color and smooth flavor profile.",
      },
      {
        type: "paragraph",
        text: "During the shading process, tea plants produce more chlorophyll and L-theanine, which contribute to matcha's deep green appearance and naturally balanced taste. This is one reason why good matcha feels softer and more rounded compared to lower quality matcha powders.",
      },
      {
        type: "list",
        intro: "Cheap or lower grade matcha is often:",
        items: [
          "dull green",
          "yellowish",
          "overly bitter",
          "sandy in texture",
          "flat in aroma",
        ],
      },
      {
        type: "list",
        intro: "Meanwhile, high quality ceremonial matcha is usually:",
        items: [
          "vibrant green",
          "smooth",
          "creamy",
          "naturally sweet",
          "rich in umami",
          "silky on the palate",
        ],
      },
      {
        type: "paragraph",
        text: "Another major factor is water temperature.",
      },
      {
        type: "paragraph",
        text: "Many people accidentally burn their matcha using boiling water. This instantly increases bitterness and destroys some of the delicate flavor compounds. Traditional Japanese tea preparation usually uses water around 70-80 C for ceremonial matcha.",
      },
      {
        type: "paragraph",
        text: "Using water that is too hot can make even good matcha taste unpleasant.",
      },
      {
        type: "paragraph",
        text: "Preparation technique also matters. Matcha should be sifted before whisking to avoid clumps and create a smoother texture. Using a bamboo whisk helps incorporate air and creates the signature creamy foam associated with traditional matcha preparation.",
      },
      {
        type: "paragraph",
        text: "The origin of the matcha also affects flavor. Different regions in Japan produce slightly different taste profiles. Some matcha tastes more nutty and creamy, while others are more floral, vegetal, or umami-forward.",
      },
      {
        type: "paragraph",
        text: "Many people who say they do not like matcha actually have never tried good ceremonial grade matcha.",
      },
      {
        type: "list",
        intro: "They may have experienced:",
        items: [
          "low quality culinary matcha",
          "overly sweet cafe drinks",
          "bitter matcha powder",
          "incorrect brewing methods",
        ],
      },
      {
        type: "paragraph",
        text: "Good matcha should feel balanced and enjoyable even without sugar.",
      },
      {
        type: "paragraph",
        text: "That is why many matcha enthusiasts enjoy drinking it traditionally with only water. When prepared correctly, the texture becomes creamy and smooth, while the flavor feels clean, comforting, and naturally rich.",
      },
      {
        type: "paragraph",
        text: "Today, ceremonial matcha has become popular not only for wellness and antioxidants, but also because people are searching for calmer and more intentional rituals in daily life.",
      },
      {
        type: "statement",
        text: "A good bowl of matcha should not feel aggressive. It should feel calming.",
      },
      {
        type: "statement",
        text: "Soft energy. Smooth flavor. Quiet focus.",
      },
      {
        type: "paragraph",
        text: "That is the beauty of properly prepared ceremonial matcha.",
      },
    ],
  },
  {
    slug: "best-water-temperature-for-matcha",
    title: "Best Water Temperature for Matcha",
    eyebrow: "Journal",
    date: "May 2026",
    readTime: "5 min read",
    category: "Matcha Preparation",
    image: {
      src: "/journal/best-water-temperature-for-matcha.png",
      alt: "Traditional matcha setup with a steaming cast iron kettle, bamboo whisk, tea bowl, and matcha powder",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "The right water temperature helps bring out matcha's smooth umami flavor, creamy texture, and natural sweetness.",
    blocks: [
      {
        type: "paragraph",
        text: "One of the most important parts of making good matcha is water temperature.",
      },
      {
        type: "paragraph",
        text: "Even the highest quality ceremonial matcha can taste bitter if the water is too hot. On the other hand, using the correct water temperature helps bring out matcha's smooth umami flavor, creamy texture, and natural sweetness.",
      },
      {
        type: "paragraph",
        text: "For most ceremonial grade matcha, the ideal water temperature is around 70-80 C.",
      },
      {
        type: "paragraph",
        text: "This temperature range is widely used in traditional Japanese tea ceremonies because it protects the delicate flavor compounds inside the tea leaves.",
      },
      {
        type: "paragraph",
        text: "Boiling water is one of the most common mistakes beginners make when preparing matcha.",
      },
      {
        type: "list",
        intro: "When water is too hot:",
        items: [
          "matcha becomes bitter",
          "flavor feels harsh",
          "aroma becomes flat",
          "umami decreases",
          "texture feels rougher",
        ],
      },
      {
        type: "paragraph",
        text: "Good matcha should taste smooth and balanced, not burnt or aggressive.",
      },
      {
        type: "paragraph",
        text: "That is why Japanese tea preparation focuses heavily on precision and mindfulness. Water temperature is treated as part of the ritual itself.",
      },
      {
        type: "list",
        intro:
          "If you do not have a temperature-controlled kettle, there are simple ways to estimate the correct temperature:",
        items: [
          "boil water first",
          "let it rest for 3-5 minutes",
          "pour into another cup before using",
          "avoid pouring directly while boiling",
        ],
      },
      {
        type: "list",
        intro: "Traditional matcha preparation often uses:",
        items: [
          "ceramic bowls",
          "bamboo whisks",
          "bamboo scoops",
          "cast iron kettles",
          "charcoal or hot water kettles",
        ],
      },
      {
        type: "paragraph",
        text: "These tools help create a slower and more intentional tea-making experience.",
      },
      {
        type: "list",
        intro: "Different matcha styles may also use slightly different temperatures:",
        items: [
          "ceremonial matcha: 70-80 C",
          "premium latte matcha: 75-85 C",
          "culinary matcha: slightly hotter acceptable",
        ],
      },
      {
        type: "paragraph",
        text: "For iced matcha latte recipes, many people first whisk the matcha with warm water before adding milk and ice. This helps dissolve the powder properly and creates a smoother drink.",
      },
      {
        type: "paragraph",
        text: "Water quality also matters. Soft, filtered water usually produces cleaner and sweeter matcha flavor compared to heavily mineralized water.",
      },
      {
        type: "paragraph",
        text: "Another important tip is not to over-whisk aggressively. The goal is to create a smooth microfoam texture using a zig-zag whisking motion with a bamboo chasen.",
      },
      {
        type: "statement",
        text: "Perfect matcha preparation is not only about taste. It is about the entire ritual.",
      },
      {
        type: "paragraph",
        text: "The steam from the kettle. The sound of whisking. The warmth of the ceramic bowl. The quiet pause before taking the first sip.",
      },
      {
        type: "list",
        intro: "Today, many people use matcha rituals as part of:",
        items: [
          "slow living",
          "mindfulness",
          "morning routines",
          "productivity rituals",
          "journaling sessions",
          "deep work habits",
        ],
      },
      {
        type: "paragraph",
        text: "The correct water temperature helps unlock the best version of ceremonial matcha.",
      },
      {
        type: "statement",
        text: "Smooth. Creamy. Balanced. Calm.",
      },
      {
        type: "paragraph",
        text: "Sometimes, small details create the biggest difference.",
      },
    ],
  },
  {
    slug: "matcha-for-focus-and-deep-work",
    title: "Matcha for Focus & Deep Work",
    eyebrow: "Journal",
    date: "May 2026",
    readTime: "5 min read",
    category: "Focus Rituals",
    image: {
      src: "/journal/matcha-for-focus-and-deep-work.png",
      alt: "Iced matcha latte on a focused work desk with laptop, journal, pen, books, and plant",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Matcha for deep work is not only about caffeine. It is about creating a better state of mind for meaningful work.",
    blocks: [
      {
        type: "paragraph",
        text: "Modern work demands constant attention.",
      },
      {
        type: "paragraph",
        text: "Notifications, meetings, multitasking, and endless screen time make it increasingly difficult to concentrate deeply for long periods of time. That is one reason why many people are now turning to matcha as part of their focus and deep work routine.",
      },
      {
        type: "paragraph",
        text: "Unlike traditional coffee, matcha provides a calmer and more sustained form of energy. The combination of caffeine and L-theanine helps create mental clarity without the intense spikes and crashes commonly associated with coffee.",
      },
      {
        type: "list",
        intro: "For many people, matcha feels ideal for:",
        items: [
          "deep work",
          "studying",
          "writing",
          "coding",
          "designing",
          "strategic thinking",
          "journaling",
          "creative sessions",
        ],
      },
      {
        type: "paragraph",
        text: "L-theanine is one of the main reasons matcha is associated with calm focus. This amino acid naturally promotes relaxation while still allowing the mind to stay alert and productive.",
      },
      {
        type: "paragraph",
        text: "That balance is what makes matcha unique.",
      },
      {
        type: "list",
        intro: "Instead of feeling overstimulated, many people describe matcha as helping them feel:",
        items: [
          "clear-headed",
          "grounded",
          "focused",
          "steady",
          "mentally calm",
        ],
      },
      {
        type: "paragraph",
        text: "The ritual itself also plays a surprisingly important role.",
      },
      {
        type: "list",
        intro: "Preparing matcha requires slowing down for a moment:",
        items: [
          "heating water carefully",
          "whisking the tea",
          "arranging the workspace",
          "taking a pause before starting work",
        ],
      },
      {
        type: "paragraph",
        text: "This small transition helps signal the brain that it is time to focus.",
      },
      {
        type: "paragraph",
        text: "Today, matcha has become deeply connected to modern productivity culture and intentional living.",
      },
      {
        type: "list",
        intro: "It is common to see matcha beside:",
        items: [
          "laptops",
          "journals",
          "creative desks",
          "minimalist workspaces",
          "study sessions",
          "quiet cafes",
        ],
      },
      {
        type: "paragraph",
        text: "An iced matcha latte has become more than a trendy drink. For many people, it represents a calmer approach to productivity.",
      },
      {
        type: "list",
        intro:
          "Unlike the hustle culture feeling often associated with multiple cups of coffee, matcha aligns more closely with:",
        items: [
          "sustainable focus",
          "mindful routines",
          "creative flow",
          "balanced energy",
          "slow productivity",
        ],
      },
      {
        type: "paragraph",
        text: "Many remote workers, entrepreneurs, students, and creators now include matcha as part of their morning ritual before entering a deep work session.",
      },
      {
        type: "list",
        intro: "Some people pair matcha with:",
        items: [
          "journaling",
          "planning sessions",
          "meditation",
          "reading",
          "brainstorming",
          "writing tasks",
        ],
      },
      {
        type: "paragraph",
        text: "Ceremonial matcha is especially appreciated because of its smoother taste and cleaner energy profile. A high quality matcha can feel comforting while still helping maintain concentration for hours.",
      },
      {
        type: "paragraph",
        text: "Environment also matters. A quiet desk, natural lighting, minimal distractions, and a calm drink ritual can significantly improve mental focus and work quality.",
      },
      {
        type: "list",
        intro: "That is why matcha has become strongly connected with:",
        items: [
          "minimalist lifestyles",
          "wellness routines",
          "intentional workspaces",
          "calm productivity aesthetics",
        ],
      },
      {
        type: "statement",
        text: "At its core, matcha for deep work is not only about caffeine. It is about creating a better state of mind for meaningful work.",
      },
      {
        type: "statement",
        text: "Focused but calm. Productive but balanced. Energized without chaos.",
      },
      {
        type: "paragraph",
        text: "Sometimes the best work begins with a slower moment.",
      },
    ],
  },
] as const;
