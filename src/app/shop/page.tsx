import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop All Homelab Matcha Products",
  description:
    "Browse every Homelab matcha product and choose your preferred marketplace checkout.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-cream px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
                  Shop Homelab
                </p>
                <h1 className="serif mt-5 text-5xl leading-[1.02] text-matcha-deep md:text-7xl">
                  All products
                </h1>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                {catalog.summary.totalProducts} SKU tersedia. Pilih produk, lalu
                checkout di marketplace yang paling nyaman.
              </p>
            </div>

            <ShopCatalog data={catalog} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
