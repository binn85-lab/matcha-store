import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroScrollScrub } from "@/components/sections/HeroScrollScrub";
import { TheRitual } from "@/components/sections/TheRitual";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { SourcedFromJapan } from "@/components/sections/SourcedFromJapan";
import { MatchaStory } from "@/components/sections/MatchaStory";
import { Newsletter } from "@/components/sections/Newsletter";
import { getFlagshipProduct } from "@/lib/products";
import { existsInPublic, filterExisting } from "@/lib/product-images.server";

const ritualPosterCandidates = [
  "/ritual/ritual-sift-poster.png",
  "/ritual/ritual-pour-poster.png",
  "/ritual/ritual-whisk-poster.png",
  "/ritual/ritual-drink-poster.png",
];

export default function HomePage() {
  const flagship = getFlagshipProduct();
  const ritualPosters = ritualPosterCandidates.map((p) =>
    existsInPublic(p) ? p : null,
  );

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <HeroScrollScrub />
        <TheRitual posters={ritualPosters} />
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
