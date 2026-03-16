import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We were throwing away $800/month and had no idea. WasteTracker showed us exactly where it was going. First month we cut waste by 26%.",
    name: "Sarah Chen",
    role: "Owner, Golden Crust Bakery",
    stars: 5,
  },
  {
    quote:
      "The 10-second logging is real — my team actually uses it. Every other tool we tried was too complicated for a busy bakery morning.",
    name: "Marcus Johnson",
    role: "Head Baker, Flour & Fold",
    stars: 5,
  },
  {
    quote:
      "The weekly digest alone is worth the price. I share it with my team every Monday and we plan our production around the data.",
    name: "Elena Rodriguez",
    role: "Manager, La Panadería",
    stars: 5,
  },
];

export function Testimonial() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Loved by bakeries everywhere
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Don&apos;t take our word for it — hear from bakery owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--cream)] hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[var(--color-sienna)] text-[var(--color-sienna)]"
                  />
                ))}
              </div>
              <blockquote className="text-[var(--foreground)] leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
