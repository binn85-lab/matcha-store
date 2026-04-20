import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TheRitual } from "@/components/sections/TheRitual";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { SourcedFromJapan } from "@/components/sections/SourcedFromJapan";
import { MatchaStory } from "@/components/sections/MatchaStory";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <TheRitual />
        <FeaturedProducts />
        <SourcedFromJapan />
        <MatchaStory />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
