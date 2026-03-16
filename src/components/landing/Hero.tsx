"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="animate-fade-slide-up">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[var(--color-sienna)]/10 text-[var(--color-sienna)]">
                Built for bakeries
              </span>
            </div>
            <h1
              className="animate-fade-slide-up animation-delay-200 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stop guessing.
              <br />
              <span className="text-[var(--color-sienna)]">
                Start measuring.
              </span>
            </h1>
            <p className="animate-fade-slide-up animation-delay-400 text-lg md:text-xl text-[var(--muted-foreground)] max-w-lg leading-relaxed">
              Track every wasted croissant, loaf, and pastry in seconds. See the
              real dollar impact — and cut waste by 20-30% in your first month.
            </p>
            <div className="animate-fade-slide-up animation-delay-600 flex flex-col sm:flex-row gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl bg-[var(--color-sienna)] text-white hover:bg-[var(--color-sienna-dark)] transition-all shadow-lg shadow-[var(--color-sienna)]/25 hover:shadow-xl hover:shadow-[var(--color-sienna)]/30 hover:-translate-y-0.5"
              >
                Start Free Trial
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 border-[var(--border)] text-[var(--foreground)] hover:border-[var(--color-sienna)] hover:text-[var(--color-sienna)] transition-all"
              >
                See Pricing
              </Link>
            </div>
            <p className="animate-fade-slide-up animation-delay-600 text-sm text-[var(--muted-foreground)]">
              ✓ 14-day free trial &nbsp; ✓ No credit card required &nbsp; ✓
              Set up in 2 minutes
            </p>
          </div>

          {/* Right image */}
          <div className="lg:col-span-5 animate-fade-slide-up animation-delay-400">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-sienna)]/20 to-[var(--color-green-organic)]/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Artisan bakery kitchen"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
