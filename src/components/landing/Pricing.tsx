"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "14 days",
    description: "Try everything — no credit card needed.",
    features: [
      "Unlimited waste logging",
      "Daily dollar dashboard",
      "Up to 20 products",
      "1 team member",
    ],
    cta: "Start Free Trial",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For single-location bakeries ready to cut waste.",
    features: [
      "Everything in Free Trial",
      "Unlimited products",
      "Weekly email digest",
      "CSV export",
      "Up to 3 team members",
      "30-day analytics",
    ],
    cta: "Get Started",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For multi-location bakeries who want full visibility.",
    features: [
      "Everything in Starter",
      "Unlimited locations",
      "Unlimited team members",
      "90-day analytics",
      "Custom categories",
      "Priority support",
      "API access",
    ],
    cta: "Go Pro",
    href: "/dashboard",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Simple, honest pricing
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-md mx-auto">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border transition-all ${
                plan.highlighted
                  ? "border-[var(--color-sienna)] bg-white shadow-xl shadow-[var(--color-sienna)]/10 md:-mt-4 md:mb-[-1rem]"
                  : "border-[var(--border)] bg-white hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--color-sienna)] text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-4xl font-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {plan.price}
                </span>
                <span className="text-[var(--muted-foreground)] text-sm">
                  {plan.period}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[var(--color-green-organic)] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "bg-[var(--color-sienna)] text-white hover:bg-[var(--color-sienna-dark)] shadow-lg shadow-[var(--color-sienna)]/25"
                    : "border-2 border-[var(--border)] text-[var(--foreground)] hover:border-[var(--color-sienna)] hover:text-[var(--color-sienna)]"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
