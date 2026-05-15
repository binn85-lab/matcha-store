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
    title: "Mengapa Matcha Terasa Berbeda dari Kopi",
    eyebrow: "Journal",
    date: "Mei 2026",
    readTime: "5 menit baca",
    category: "Matcha & Fokus",
    image: {
      src: "/journal/why-matcha-feels-different-than-coffee.png",
      alt: "Semangkuk ceremonial matcha, iced matcha latte, chasen bambu, dan bubuk matcha di atas meja ritual yang hangat",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Matcha bukan hanya tentang kafein. Matcha adalah tentang bagaimana kamu ingin energimu terasa: tenang, jernih, fokus, dan seimbang.",
    blocks: [
      {
        type: "paragraph",
        text: "Jika kamu pernah beralih dari kopi ke matcha, biasanya ada satu hal yang langsung terasa: energinya berbeda. Bukan lebih kuat. Bukan lebih lemah. Tapi lebih halus, lebih tenang, dan lebih seimbang.",
      },
      {
        type: "paragraph",
        text: "Banyak orang menggambarkan kopi sebagai energi yang cepat dan intens, sementara matcha terasa lebih stabil dan fokus. Alasannya datang dari kombinasi alami antara kafein dan L-theanine yang terdapat dalam ceremonial grade matcha.",
      },
      {
        type: "paragraph",
        text: "Berbeda dari kopi yang sering memberi lonjakan kafein cepat lalu diikuti penurunan energi, matcha melepaskan energi secara lebih bertahap. Matcha mengandung L-theanine, asam amino alami yang sering dikaitkan dengan rasa rileks, tenang, dan kejernihan pikiran. Bersama kafein, L-theanine membantu menciptakan rasa waspada yang seimbang tanpa sensasi gelisah yang sering dialami sebagian peminum kopi.",
      },
      {
        type: "paragraph",
        text: "Inilah salah satu alasan matcha semakin disukai oleh orang-orang yang ingin fokus lebih lama, masuk ke sesi kerja mendalam, berpikir kreatif, dan menjalani rutinitas harian yang lebih tenang.",
      },
      {
        type: "paragraph",
        text: "Perbedaan penting lainnya ada pada cara matcha dikonsumsi. Pada kopi, biji diseduh lalu yang diminum adalah hasil ekstraksinya. Pada matcha, daun teh utuh dikonsumsi dalam bentuk bubuk halus. Karena itu, matcha secara alami membawa antioksidan, klorofil, dan nutrisi dari daun teh secara lebih utuh dibandingkan teh hijau seduh biasa.",
      },
      {
        type: "paragraph",
        text: "Ceremonial matcha berkualitas tinggi juga secara alami kaya katekin, terutama EGCG, yang dikenal karena sifat antioksidannya. Ini membuat matcha bukan hanya minuman untuk produktivitas, tetapi juga bagian dari rutinitas kesehatan dan gaya hidup sehat.",
      },
      {
        type: "list",
        intro: "Banyak orang menggunakan matcha sebagai:",
        items: [
          "alternatif kopi",
          "minuman fokus sebelum bekerja",
          "ritual pagi yang tenang",
          "teman saat berkarya",
          "pendukung produktivitas",
          "sumber kafein yang lebih lembut",
        ],
      },
      {
        type: "paragraph",
        text: "Ritualnya sendiri juga ikut membentuk pengalaman. Menyiapkan matcha membuat kita melambat sejenak: mengocok teh, memperhatikan suhu air, dan menciptakan jeda kecil sebelum memulai hari. Berbeda dari mengambil kopi dengan terburu-buru, matcha sering mengajak kita untuk lebih mindful dan lebih intentional.",
      },
      {
        type: "paragraph",
        text: "Kombinasi antara energi yang tenang, kejernihan pikiran, dan ritual inilah yang membuat matcha terasa berbeda dari kopi.",
      },
      {
        type: "paragraph",
        text: "Alasan lain matcha terasa lebih halus adalah cara tubuh menyerap kafeinnya. Kopi sering terasa cepat masuk dan dapat meningkatkan rasa cemas pada orang yang sensitif. Matcha cenderung terasa lebih lembut karena L-theanine membantu menyeimbangkan efek stimulasi dari kafein.",
      },
      {
        type: "list",
        intro: "Untuk orang yang sering mengalami:",
        items: [
          "energi turun setelah minum kopi",
          "pikiran terlalu ramai",
          "cemas setelah minum kafein",
          "sulit berkonsentrasi",
          "energi yang naik turun",
        ],
      },
      {
        type: "paragraph",
        text: "matcha bisa terasa seperti pilihan yang lebih seimbang.",
      },
      {
        type: "list",
        intro: "Itulah mengapa matcha banyak disukai oleh:",
        items: [
          "desainer",
          "penulis",
          "entrepreneur",
          "pelajar",
          "kreator",
          "pekerja jarak jauh",
          "atlet",
          "orang yang menjalani hidup lebih pelan dan sadar",
        ],
      },
      {
        type: "paragraph",
        text: "Kini banyak orang menjadikan matcha bagian dari ritual fokus harian. Iced matcha latte saat bekerja. Semangkuk matcha hangat sebelum menulis jurnal. Jeda yang sadar di antara rapat.",
      },
      {
        type: "statement",
        text: "Pada akhirnya, matcha bukan hanya tentang kafein. Matcha adalah tentang bagaimana kamu ingin energimu terasa.",
      },
      {
        type: "statement",
        text: "Tenang. Jernih. Fokus. Seimbang.",
      },
      {
        type: "paragraph",
        text: "Itulah mengapa matcha terasa berbeda dari kopi.",
      },
    ],
  },
  {
    slug: "why-good-matcha-shouldnt-taste-bitter",
    title: "Mengapa Matcha yang Baik Tidak Seharusnya Pahit",
    eyebrow: "Journal",
    date: "Mei 2026",
    readTime: "5 menit baca",
    category: "Kualitas Matcha",
    image: {
      src: "/journal/why-good-matcha-shouldnt-taste-bitter.png",
      alt: "Semangkuk ceremonial matcha hangat dengan chasen bambu, gelas air, dan bubuk matcha dalam cahaya pagi yang lembut",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Ceremonial matcha berkualitas tinggi seharusnya terasa halus, creamy, manis alami, dan kaya umami, bukan tajam atau tidak nyaman diminum.",
    blocks: [
      {
        type: "paragraph",
        text: "Salah satu miskonsepsi terbesar tentang matcha adalah anggapan bahwa matcha memang seharusnya terasa pahit.",
      },
      {
        type: "paragraph",
        text: "Padahal, ceremonial grade matcha berkualitas tinggi seharusnya terasa halus, creamy, manis alami, dan kaya umami, bukan tajam atau tidak enak diminum.",
      },
      {
        type: "paragraph",
        text: "Jika matcha terasa sangat pahit, terlalu grassy, atau terlalu sepat, biasanya ada penyebab di baliknya.",
      },
      {
        type: "paragraph",
        text: "Kualitas daun teh sangat berpengaruh. Premium Japanese ceremonial matcha dibuat dari daun teh yang ditanam dengan metode shade-grown, dipanen muda, lalu diproses secara hati-hati agar warna hijau cerah dan profil rasa halusnya tetap terjaga.",
      },
      {
        type: "paragraph",
        text: "Selama proses shading, tanaman teh menghasilkan lebih banyak klorofil dan L-theanine. Keduanya membantu membentuk warna hijau yang dalam dan rasa yang lebih seimbang. Karena itu, matcha yang baik terasa lebih lembut dan rounded dibandingkan bubuk matcha berkualitas rendah.",
      },
      {
        type: "list",
        intro: "Matcha murah atau grade rendah sering terasa atau terlihat:",
        items: [
          "hijau kusam",
          "kekuningan",
          "terlalu pahit",
          "berpasir di tekstur",
          "aromanya datar",
        ],
      },
      {
        type: "list",
        intro: "Sementara ceremonial matcha berkualitas tinggi biasanya:",
        items: [
          "hijau cerah",
          "halus",
          "creamy",
          "manis alami",
          "kaya umami",
          "lembut di lidah",
        ],
      },
      {
        type: "paragraph",
        text: "Faktor besar lainnya adalah suhu air.",
      },
      {
        type: "paragraph",
        text: "Banyak orang tidak sengaja membakar matcha dengan air mendidih. Hal ini langsung meningkatkan rasa pahit dan merusak sebagian senyawa rasa yang lembut. Dalam persiapan teh Jepang tradisional, ceremonial matcha biasanya menggunakan air sekitar 70-80 C.",
      },
      {
        type: "paragraph",
        text: "Air yang terlalu panas dapat membuat matcha yang bagus sekalipun terasa kurang nyaman diminum.",
      },
      {
        type: "paragraph",
        text: "Teknik persiapan juga penting. Matcha sebaiknya diayak sebelum dikocok agar tidak menggumpal dan teksturnya lebih halus. Menggunakan chasen atau bamboo whisk membantu memasukkan udara dan menciptakan microfoam creamy yang identik dengan persiapan matcha tradisional.",
      },
      {
        type: "paragraph",
        text: "Asal matcha juga memengaruhi rasa. Setiap daerah di Jepang dapat menghasilkan profil rasa yang sedikit berbeda. Ada matcha yang lebih nutty dan creamy, ada juga yang lebih floral, vegetal, atau umami-forward.",
      },
      {
        type: "paragraph",
        text: "Banyak orang yang merasa tidak suka matcha sebenarnya belum pernah mencoba ceremonial grade matcha yang baik.",
      },
      {
        type: "list",
        intro: "Mungkin yang pernah mereka coba adalah:",
        items: [
          "culinary matcha berkualitas rendah",
          "minuman kafe yang terlalu manis",
          "bubuk matcha yang pahit",
          "metode seduh yang kurang tepat",
        ],
      },
      {
        type: "paragraph",
        text: "Matcha yang baik seharusnya terasa seimbang dan menyenangkan bahkan tanpa gula.",
      },
      {
        type: "paragraph",
        text: "Itulah mengapa banyak penggemar matcha menikmati matcha secara tradisional hanya dengan air. Jika disiapkan dengan benar, teksturnya menjadi creamy dan halus, sementara rasanya bersih, nyaman, dan kaya secara alami.",
      },
      {
        type: "paragraph",
        text: "Hari ini, ceremonial matcha populer bukan hanya karena kesehatan dan antioksidan, tetapi juga karena banyak orang mencari ritual harian yang lebih tenang dan penuh niat.",
      },
      {
        type: "statement",
        text: "Semangkuk matcha yang baik tidak seharusnya terasa agresif. Ia seharusnya terasa menenangkan.",
      },
      {
        type: "statement",
        text: "Energi lembut. Rasa halus. Fokus yang tenang.",
      },
      {
        type: "paragraph",
        text: "Itulah keindahan dari ceremonial matcha yang disiapkan dengan benar.",
      },
    ],
  },
  {
    slug: "best-water-temperature-for-matcha",
    title: "Suhu Air Terbaik untuk Matcha",
    eyebrow: "Journal",
    date: "Mei 2026",
    readTime: "5 menit baca",
    category: "Persiapan Matcha",
    image: {
      src: "/journal/best-water-temperature-for-matcha.png",
      alt: "Peralatan matcha tradisional dengan teko besi beruap, chasen bambu, chawan, dan bubuk matcha",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Suhu air yang tepat membantu memunculkan rasa umami yang halus, tekstur creamy, dan manis alami dari matcha.",
    blocks: [
      {
        type: "paragraph",
        text: "Salah satu bagian paling penting dalam membuat matcha yang enak adalah suhu air.",
      },
      {
        type: "paragraph",
        text: "Ceremonial matcha berkualitas tinggi sekalipun bisa terasa pahit jika airnya terlalu panas. Sebaliknya, suhu air yang tepat membantu memunculkan rasa umami yang halus, tekstur creamy, dan manis alami dari matcha.",
      },
      {
        type: "paragraph",
        text: "Untuk sebagian besar ceremonial grade matcha, suhu air ideal berada di sekitar 70-80 C.",
      },
      {
        type: "paragraph",
        text: "Rentang suhu ini banyak digunakan dalam tradisi teh Jepang karena membantu melindungi senyawa rasa yang lembut di dalam daun teh.",
      },
      {
        type: "paragraph",
        text: "Air mendidih adalah salah satu kesalahan paling umum saat pemula menyiapkan matcha.",
      },
      {
        type: "list",
        intro: "Saat air terlalu panas:",
        items: [
          "matcha menjadi pahit",
          "rasa terasa kasar",
          "aroma menjadi datar",
          "umami berkurang",
          "tekstur terasa lebih rough",
        ],
      },
      {
        type: "paragraph",
        text: "Matcha yang baik seharusnya terasa halus dan seimbang, bukan gosong atau agresif.",
      },
      {
        type: "paragraph",
        text: "Itulah mengapa persiapan teh Jepang sangat memperhatikan presisi dan kesadaran penuh. Suhu air diperlakukan sebagai bagian dari ritual itu sendiri.",
      },
      {
        type: "list",
        intro:
          "Jika tidak memiliki kettle dengan pengatur suhu, ada beberapa cara sederhana untuk memperkirakan suhu yang tepat:",
        items: [
          "didihkan air terlebih dahulu",
          "diamkan selama 3-5 menit",
          "tuang ke cangkir lain sebelum digunakan",
          "hindari menuang langsung saat air masih mendidih",
        ],
      },
      {
        type: "list",
        intro: "Persiapan matcha tradisional sering menggunakan:",
        items: [
          "mangkuk keramik",
          "chasen bambu",
          "chashaku bambu",
          "teko besi",
          "arang atau kettle air panas",
        ],
      },
      {
        type: "paragraph",
        text: "Alat-alat ini membantu menciptakan pengalaman membuat teh yang lebih pelan dan lebih intentional.",
      },
      {
        type: "list",
        intro: "Gaya matcha yang berbeda bisa menggunakan suhu yang sedikit berbeda:",
        items: [
          "ceremonial matcha: 70-80 C",
          "premium latte matcha: 75-85 C",
          "culinary matcha: sedikit lebih panas masih bisa diterima",
        ],
      },
      {
        type: "paragraph",
        text: "Untuk iced matcha latte, banyak orang mengocok matcha terlebih dahulu dengan air hangat sebelum menambahkan susu dan es. Cara ini membantu bubuk larut lebih baik dan menghasilkan minuman yang lebih halus.",
      },
      {
        type: "paragraph",
        text: "Kualitas air juga berpengaruh. Air yang lembut dan tersaring biasanya menghasilkan rasa matcha yang lebih bersih dan manis dibandingkan air yang terlalu banyak mineral.",
      },
      {
        type: "paragraph",
        text: "Tips penting lainnya adalah tidak mengocok terlalu agresif. Tujuannya adalah menciptakan microfoam yang halus dengan gerakan zig-zag menggunakan chasen bambu.",
      },
      {
        type: "statement",
        text: "Persiapan matcha yang baik bukan hanya tentang rasa. Ia tentang keseluruhan ritual.",
      },
      {
        type: "paragraph",
        text: "Uap dari kettle. Suara whisking. Hangatnya mangkuk keramik. Jeda tenang sebelum tegukan pertama.",
      },
      {
        type: "list",
        intro: "Kini banyak orang menggunakan ritual matcha sebagai bagian dari:",
        items: [
          "hidup lebih pelan dan sadar",
          "kesadaran penuh",
          "rutinitas pagi",
          "ritual produktivitas",
          "sesi journaling",
          "kebiasaan kerja mendalam",
        ],
      },
      {
        type: "paragraph",
        text: "Suhu air yang tepat membantu membuka versi terbaik dari ceremonial matcha.",
      },
      {
        type: "statement",
        text: "Halus. Creamy. Seimbang. Tenang.",
      },
      {
        type: "paragraph",
        text: "Kadang, detail kecil menciptakan perbedaan terbesar.",
      },
    ],
  },
  {
    slug: "matcha-for-focus-and-deep-work",
    title: "Matcha untuk Fokus & Kerja Mendalam",
    eyebrow: "Journal",
    date: "Mei 2026",
    readTime: "5 menit baca",
    category: "Ritual Fokus",
    image: {
      src: "/journal/matcha-for-focus-and-deep-work.png",
      alt: "Iced matcha latte di meja kerja dengan laptop, jurnal, pena, buku, dan tanaman",
      width: 1536,
      height: 1024,
    },
    excerpt:
      "Matcha untuk kerja mendalam bukan hanya tentang kafein. Ia membantu menciptakan keadaan pikiran yang lebih baik untuk pekerjaan yang bermakna.",
    blocks: [
      {
        type: "paragraph",
        text: "Dunia kerja modern menuntut perhatian yang konstan.",
      },
      {
        type: "paragraph",
        text: "Notifikasi, rapat, multitasking, dan waktu layar yang panjang membuat kita semakin sulit berkonsentrasi dalam waktu lama. Itulah salah satu alasan banyak orang mulai menjadikan matcha bagian dari rutinitas fokus dan kerja mendalam mereka.",
      },
      {
        type: "paragraph",
        text: "Berbeda dari kopi biasa, matcha memberikan energi yang lebih tenang dan lebih tahan lama. Kombinasi kafein dan L-theanine membantu menciptakan kejernihan pikiran tanpa lonjakan dan crash yang sering diasosiasikan dengan kopi.",
      },
      {
        type: "list",
        intro: "Bagi banyak orang, matcha terasa ideal untuk:",
        items: [
          "kerja mendalam",
          "belajar",
          "menulis",
          "coding",
          "mendesain",
          "berpikir strategis",
          "journaling",
          "sesi kreatif",
        ],
      },
      {
        type: "paragraph",
        text: "L-theanine adalah salah satu alasan utama matcha sering dikaitkan dengan calm focus. Asam amino ini secara alami mendukung rasa rileks sambil tetap membantu pikiran tetap waspada dan produktif.",
      },
      {
        type: "paragraph",
        text: "Keseimbangan inilah yang membuat matcha terasa unik.",
      },
      {
        type: "list",
        intro: "Alih-alih merasa overstimulated, banyak orang menggambarkan matcha membantu mereka merasa:",
        items: [
          "lebih jernih",
          "lebih grounded",
          "lebih fokus",
          "lebih stabil",
          "lebih tenang secara mental",
        ],
      },
      {
        type: "paragraph",
        text: "Ritualnya sendiri juga memainkan peran yang cukup besar.",
      },
      {
        type: "list",
        intro: "Menyiapkan matcha membuat kita melambat sejenak:",
        items: [
          "memanaskan air dengan hati-hati",
          "mengocok teh",
          "merapikan ruang kerja",
          "mengambil jeda sebelum mulai bekerja",
        ],
      },
      {
        type: "paragraph",
        text: "Transisi kecil ini membantu memberi sinyal pada otak bahwa sekarang waktunya untuk fokus.",
      },
      {
        type: "paragraph",
        text: "Hari ini, matcha semakin terhubung dengan budaya produktivitas modern dan intentional living.",
      },
      {
        type: "list",
        intro: "Matcha sering terlihat berdampingan dengan:",
        items: [
          "laptop",
          "jurnal",
          "meja kreatif",
          "ruang kerja minimalis",
          "sesi belajar",
          "kafe yang tenang",
        ],
      },
      {
        type: "paragraph",
        text: "Iced matcha latte kini menjadi lebih dari sekadar minuman tren. Bagi banyak orang, ia mewakili pendekatan yang lebih tenang terhadap produktivitas.",
      },
      {
        type: "list",
        intro:
          "Berbeda dari nuansa hustle culture yang sering melekat pada beberapa gelas kopi, matcha lebih dekat dengan:",
        items: [
          "fokus yang berkelanjutan",
          "rutinitas mindful",
          "alur kreatif",
          "energi seimbang",
          "produktivitas yang lebih tenang",
        ],
      },
      {
        type: "paragraph",
        text: "Banyak pekerja jarak jauh, entrepreneur, pelajar, dan kreator kini memasukkan matcha ke ritual pagi sebelum masuk ke sesi kerja mendalam.",
      },
      {
        type: "list",
        intro: "Sebagian orang memasangkan matcha dengan:",
        items: [
          "journaling",
          "planning session",
          "meditasi",
          "membaca",
          "brainstorming",
          "tugas menulis",
        ],
      },
      {
        type: "paragraph",
        text: "Ceremonial matcha sangat diapresiasi karena rasa yang lebih halus dan profil energi yang lebih bersih. Matcha berkualitas tinggi bisa terasa comforting sambil tetap membantu menjaga konsentrasi selama berjam-jam.",
      },
      {
        type: "paragraph",
        text: "Lingkungan juga berpengaruh. Meja yang tenang, cahaya alami, distraksi minimal, dan ritual minum yang calm dapat membantu meningkatkan fokus mental dan kualitas kerja.",
      },
      {
        type: "list",
        intro: "Itulah mengapa matcha semakin terhubung dengan:",
        items: [
          "gaya hidup minimalis",
          "rutinitas kesehatan",
          "ruang kerja yang tertata dengan niat",
          "estetika produktivitas yang tenang",
        ],
      },
      {
        type: "statement",
        text: "Pada intinya, matcha untuk kerja mendalam bukan hanya tentang kafein. Ia tentang menciptakan keadaan pikiran yang lebih baik untuk pekerjaan yang bermakna.",
      },
      {
        type: "statement",
        text: "Fokus tapi tenang. Produktif tapi seimbang. Berenergi tanpa rasa kacau.",
      },
      {
        type: "paragraph",
        text: "Kadang, pekerjaan terbaik dimulai dari momen yang lebih pelan.",
      },
    ],
  },
] as const;
