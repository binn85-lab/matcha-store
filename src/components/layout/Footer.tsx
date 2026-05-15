import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns = [
  {
    heading: "Shop",
    links: [
      { href: "/shop?category=Matcha%20Powder&q=ceremonial", label: "Ceremonial Matcha" },
      { href: "/shop?category=Matcha%20Powder&q=baking", label: "Culinary Matcha" },
      { href: "/shop?category=Tools", label: "Tools & Ware" },
      { href: "/shop", label: "All products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/story", label: "The Matcha Story" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/shipping", label: "Shipping & returns" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-cream-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Image
              src="/brand/homelab-logo.png"
              alt="Homelab"
              width={8000}
              height={1342}
              className="h-8 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              A quiet laboratory for tea lovers. Pure matcha powder and simple
              brewing inspiration for daily cups across Indonesia.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                aria-label="Homelab on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-matcha-mid hover:text-matcha-deep"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@homelab.id"
                aria-label="Email Homelab"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-matcha-mid hover:text-matcha-deep"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-matcha-deep">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-sm text-ink-soft transition-colors hover:text-matcha-deep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-matcha-deep">
              Contact
            </h3>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-ink-soft">
              <span className="block">Homelab Indonesia</span>
              <span className="block">hello@homelab.id</span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} Homelab. Made for matcha rituals across Indonesia.</p>
          <p className="tracking-wide">Est. 2026 &middot; Made for the ritual.</p>
        </div>
      </div>
    </footer>
  );
}
