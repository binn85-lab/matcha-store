import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Contact Us | Homelab",
  description:
    "Contact Homelab for ceremonial matcha questions, order support, wholesale inquiries, collaborations, and daily ritual recommendations.",
};

const helpTopics = [
  "Product recommendations",
  "Matcha preparation",
  "Order tracking",
  "Shipping information",
  "Collaborations / affiliate",
  "Wholesale inquiries",
];

const whatsappHref =
  "https://wa.me/6282163998709?text=Hello%20Homelab%2C%20I%27d%20like%20to%20ask%20about%20matcha%20products%20and%20orders.";

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

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.7 3c.4 2.3 1.8 3.9 4.1 4.2v3.1a8 8 0 0 1-4.1-1.2v5.7c0 3.7-2.5 6.2-6.1 6.2-3.2 0-5.7-2.2-5.7-5.3 0-3.4 2.7-5.5 6.2-5.2v3.2c-1.7-.3-3 .5-3 1.9 0 1.3 1 2.2 2.4 2.2 1.5 0 2.7-.8 2.7-3V3h3.5Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-matcha-mid">
                  Contact Us
                </p>
                <h1 className="serif mt-5 text-5xl leading-[1.02] text-matcha-deep md:text-7xl">
                  We&apos;d love to
                  <span className="italic text-matcha-mid"> hear from you.</span>
                </h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                Whether you have questions about ceremonial matcha, your order,
                wholesale partnerships, or simply want recommendations for your
                daily ritual, our team is here to help.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-sm bg-cream-soft shadow-[0_36px_100px_-65px_rgba(74,93,58,0.5)]">
              <Image
                src="/contact/contact-us.png"
                alt="Sunrise over green tea fields with soft morning light"
                width={3072}
                height={2048}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.55fr)] lg:gap-16">
              <section className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-matcha-mid">
                  Need help with
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {helpTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 border-b border-line py-4 text-base text-ink-soft md:text-lg"
                    >
                      <Sparkles
                        className="h-4 w-4 text-matcha-mid"
                        aria-hidden="true"
                      />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-10 text-lg leading-relaxed text-ink-soft md:text-xl">
                  Feel free to reach out anytime. We&apos;ll help you find the
                  right matcha, prepare it better, or point you to the next
                  quiet cup.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#128c3a] bg-[#18b552] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#128c3a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#18b552]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Chat on WhatsApp
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:homelabid@gmail.com"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-matcha-deep transition-colors hover:border-matcha-mid hover:text-matcha-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email Homelab
                  </a>
                </div>
              </section>

              <aside className="space-y-8 border-l-0 border-line lg:border-l lg:pl-10">
                <section>
                  <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    Email
                  </p>
                  <a
                    href="mailto:homelabid@gmail.com"
                    className="mt-3 inline-flex text-lg font-medium text-matcha-deep transition-colors hover:text-matcha-mid"
                  >
                    homelabid@gmail.com
                  </a>
                </section>

                <section>
                  <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    WhatsApp
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-matcha-deep transition-colors hover:text-matcha-mid"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    +62 821 6399 8709
                  </a>
                </section>

                <section>
                  <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    Instagram
                  </p>
                  <Link
                    href="https://www.instagram.com/homelab_id"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-matcha-deep transition-colors hover:text-matcha-mid"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    @homelab_id
                  </Link>
                </section>

                <section>
                  <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    TikTok
                  </p>
                  <Link
                    href="https://www.tiktok.com/@homelab.id"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-matcha-deep transition-colors hover:text-matcha-mid"
                  >
                    <TikTokIcon className="h-4 w-4" />
                    @homelab.id
                  </Link>
                </section>

                <section>
                  <p className="text-xs uppercase tracking-[0.22em] text-matcha-mid">
                    Business Hours
                  </p>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                    <p className="flex gap-3">
                      <Clock
                        className="mt-1 h-4 w-4 flex-none text-matcha-mid"
                        aria-hidden="true"
                      />
                      <span>
                        Monday - Friday
                        <br />
                        09:00 - 17:00 WIB
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <Clock
                        className="mt-1 h-4 w-4 flex-none text-matcha-mid"
                        aria-hidden="true"
                      />
                      <span>
                        Saturday
                        <br />
                        09:00 - 13:00 WIB
                      </span>
                    </p>
                  </div>
                </section>
              </aside>
            </div>

            <section className="mt-20 border-t border-line pt-12">
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.24em] text-matcha-mid">
                  A Small Reminder
                </p>
                <p className="serif mt-5 text-4xl leading-tight text-matcha-deep md:text-5xl">
                  Sometimes the best conversations begin slowly, just like
                  matcha.
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  We&apos;ll do our best to respond as thoughtfully and quickly
                  as possible.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
