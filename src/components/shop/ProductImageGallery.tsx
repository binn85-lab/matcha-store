"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToImage = (index: number) => {
    const strip = stripRef.current;
    if (!strip) return;

    const nextIndex = Math.max(0, Math.min(index, images.length - 1));
    strip.scrollTo({ left: nextIndex * strip.clientWidth, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const scrollByImage = (direction: -1 | 1) => {
    scrollToImage(activeIndex + direction);
  };

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const updateActiveIndex = () => {
      if (!strip.clientWidth) return;
      setActiveIndex(Math.round(strip.scrollLeft / strip.clientWidth));
    };

    strip.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => strip.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-sm bg-cream-soft">
        <div
          ref={stripRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${productName} ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              className="aspect-square w-full flex-[0_0_100%] snap-start object-cover"
            />
          ))}
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => scrollByImage(-1)}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-matcha-deep backdrop-blur transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => scrollByImage(1)}
              disabled={activeIndex === images.length - 1}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-ink/15 bg-cream/90 text-matcha-deep backdrop-blur transition-colors hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] tracking-wide text-cream">
              {activeIndex + 1}/{images.length}
            </span>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => (
            <button
              key={`thumb-${image}-${index}`}
              type="button"
              aria-label={`Buka foto ${index + 1}`}
              onClick={() => scrollToImage(index)}
              className={`shrink-0 rounded-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid ${
                activeIndex === index ? "border-matcha-deep" : "border-line"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-[1px] object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
