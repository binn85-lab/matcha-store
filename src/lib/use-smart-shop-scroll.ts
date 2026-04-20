"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useCallback, type MouseEvent } from "react";

export const SHOWCASE_ANCHOR_ID = "product-showcase";

export function useSmartShopScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (pathname !== "/") return;
      const target = document.getElementById(SHOWCASE_ANCHOR_ID);
      if (!target) return;
      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [pathname, lenis],
  );
}
