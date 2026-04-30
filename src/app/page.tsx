import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroScrollScrub } from "@/components/sections/HeroScrollScrub";
import RitualSection from "@/components/sections/ritual-section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { MatchaRitualStory } from "@/components/sections/SourcedFromJapan";
import { MatchaStory } from "@/components/sections/MatchaStory";
import { Newsletter } from "@/components/sections/Newsletter";
import { getFlagshipProducts } from "@/lib/products";

export default function HomePage() {
  const flagshipProducts = getFlagshipProducts();

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <HeroScrollScrub />
        <RitualSection />
        {flagshipProducts.length ? (
          <ProductShowcase products={flagshipProducts} />
        ) : null}
        <MatchaRitualStory />
        <MatchaStory />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
