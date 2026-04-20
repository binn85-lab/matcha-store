import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { MatchaStory } from "@/components/sections/MatchaStory";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <FeaturedProducts />
        <MatchaStory />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
