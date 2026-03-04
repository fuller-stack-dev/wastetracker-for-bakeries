import { Clock, DollarSign, Mail } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Log in 10 seconds",
    description:
      "Tap, select, done. Our tablet-friendly form is designed for flour-dusted hands and busy mornings.",
  },
  {
    icon: DollarSign,
    title: "See your $ waste live",
    description:
      "Watch your daily waste total update in real-time. Every croissant, every loaf — tracked and costed automatically.",
  },
  {
    icon: Mail,
    title: "Weekly digest, zero effort",
    description:
      "Get a beautifully simple email every Monday showing what you wasted, what you saved, and where to improve.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="text-lg text-[var(--muted-foreground)]">
            Purpose-built for artisan bakeries — not another generic inventory
            tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group p-8 rounded-2xl border border-[var(--border)] bg-[var(--cream)] hover:shadow-lg hover:shadow-[var(--color-sienna)]/5 transition-all hover:-translate-y-1 ${
                i === 1 ? "md:-mt-4" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-green-organic)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-green-organic)]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[var(--color-green-organic)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
