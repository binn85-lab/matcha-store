import Image from "next/image";

export function CeremonialLineup() {
  return (
    <section
      aria-labelledby="ceremonial-lineup-heading"
      className="relative w-full bg-[#EFE8D7]"
    >
      <h2 id="ceremonial-lineup-heading" className="sr-only">
        Ceremonial Matcha from Japan
      </h2>
      <div className="relative mx-auto w-full max-w-[1920px]">
        <Image
          src="/products/ceremonial-lineup.jpg"
          alt="Homelab ceremonial matcha lineup from Japan — Samidori 1.0, Tenarai, Wakamurasaki, Kyo Organic, Ujinoko, Samidori 2.0, and Okumidori 1.0"
          width={2944}
          height={1440}
          sizes="100vw"
          className="h-auto w-full"
          priority={false}
        />
      </div>
    </section>
  );
}
