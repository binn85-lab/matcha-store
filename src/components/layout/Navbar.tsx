import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "The Matcha Story" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <Link
          href="/"
          aria-label="Homelab — home"
          className="serif text-2xl tracking-wide text-matcha-deep"
        >
          Homelab
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm tracking-wide text-ink-soft transition-colors hover:text-matcha-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-soft hover:text-matcha-deep"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-soft hover:text-matcha-deep"
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
