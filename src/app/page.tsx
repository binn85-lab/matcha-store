import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroScrollScrub } from "@/components/sections/HeroScrollScrub";
import RitualSection from "@/components/sections/ritual-section";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { SourcedFromJapan } from "@/components/sections/SourcedFromJapan";
import { MatchaStory } from "@/components/sections/MatchaStory";
import { Newsletter } from "@/components/sections/Newsletter";
import { getFlagshipProduct } from "@/lib/products";
import { filterExisting } from "@/lib/product-images.server";

export default function HomePage() {
  const flagship = getFlagshipProduct();

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <HeroScrollScrub />
        <RitualSection />
        {flagship ? (
          <ProductShowcase
            product={flagship}
            galleryImages={filterExisting([
              flagship.images.main,
              flagship.images.closeup,
              flagship.images.powder,
              flagship.images.flatlay,
            ])}
          />
        ) : null}
        <FeaturedProducts />
        <SourcedFromJapan />
        <MatchaStory />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
