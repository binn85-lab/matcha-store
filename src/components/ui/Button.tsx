import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<Variant, string> = {
  primary:
    "bg-matcha-deep text-cream hover:bg-matcha-mid active:translate-y-[1px]",
  ghost:
    "border border-line text-ink hover:border-matcha-mid hover:text-matcha-deep",
};

interface LinkButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  prefetch = false,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(base, variants[variant], className)}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
