import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--cream)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-sienna)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span
              className="text-xl font-bold text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              WasteTracker
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-[var(--color-sienna)] text-white hover:bg-[var(--color-sienna-dark)] transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>
      <main className="pt-16">{children}</main>
      <footer className="border-t border-[var(--border)] bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-[var(--color-sienna)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">W</span>
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  WasteTracker
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] max-w-xs">
                Helping artisan bakeries reduce waste, save money, and bake
                smarter.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div className="space-y-2">
                <p className="font-semibold">Product</p>
                <p className="text-[var(--muted-foreground)]">Features</p>
                <p className="text-[var(--muted-foreground)]">Pricing</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Company</p>
                <p className="text-[var(--muted-foreground)]">About</p>
                <p className="text-[var(--muted-foreground)]">Contact</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
            © 2026 WasteTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
