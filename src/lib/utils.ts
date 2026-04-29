export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatIDR(amount: number): string {
  // Manual format to avoid SSR/client ICU mismatch on the currency symbol spacing
  // (Node outputs "Rp385.000", some browsers output "Rp 385.000").
  const digits = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `Rp${digits}`;
}
