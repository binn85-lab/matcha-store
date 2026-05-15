"use client";

import { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const META_PIXEL_ID = "280743586539923";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixel() {
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelRouteEvents />
      </Suspense>
    </>
  );
}

interface MetaProductViewEventProps {
  contentId: string;
  contentName: string;
  contentCategory?: string;
  value?: number;
}

export function MetaProductViewEvent({
  contentId,
  contentName,
  contentCategory,
  value,
}: MetaProductViewEventProps) {
  const pathname = usePathname();
  const sentKey = useRef("");

  useEffect(() => {
    const eventKey = `${pathname}:${contentId}`;
    if (sentKey.current === eventKey) return;

    let attempts = 0;
    const payload = {
      content_ids: [contentId],
      content_type: "product",
      content_name: contentName,
      content_category: contentCategory,
      contents: [
        {
          id: contentId,
          quantity: 1,
          ...(typeof value === "number" ? { item_price: value } : {}),
        },
      ],
      ...(typeof value === "number" ? { value, currency: "IDR" } : {}),
    };

    const sendViewContent = () => {
      attempts += 1;
      if (typeof window.fbq === "function") {
        window.fbq("track", "ViewContent", payload);
        sentKey.current = eventKey;
        return;
      }

      if (attempts < 20) {
        window.setTimeout(sendViewContent, 250);
      }
    };

    sendViewContent();
  }, [contentCategory, contentId, contentName, pathname, value]);

  return null;
}

function MetaPixelRouteEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skippedInitialPageView = useRef(false);

  useEffect(() => {
    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}
