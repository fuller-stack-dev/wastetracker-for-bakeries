"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// @ts-expect-error — lucide-react exports exist at runtime
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const hasClerk = clerkKey && !clerkKey.includes("placeholder");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (hasClerk) {
      // With Clerk configured, use Clerk's sign-in
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useSignIn } = require("@clerk/nextjs");
        // Note: this would be a hook in production — simplified for demo
        setError("Clerk sign-in will be integrated when Clerk keys are configured.");
      } catch {
        setError("Auth provider not available.");
      }
      setLoading(false);
      return;
    }

    // Demo mode — accept any credentials
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  }

  async function handleGitHubSignIn() {
    if (hasClerk) {
      setError("GitHub sign-in will be available when Clerk is configured.");
      return;
    }
    // Demo mode
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-sienna)] flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-lg">W</span>
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Sign in to your WasteTracker account
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 space-y-5">
        {/* GitHub button */}
        <button
          onClick={handleGitHubSignIn}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border)] text-sm font-medium hover:bg-[var(--accent)] transition-colors"
        >
          <svg className="w-5 h-5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--muted-foreground)]">or</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@bakery.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--muted-foreground)] mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--cream)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/30 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--color-sienna)] text-white font-semibold text-sm hover:bg-[var(--color-sienna-dark)] transition-colors shadow-lg shadow-[var(--color-sienna)]/25 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-[var(--muted-foreground)] mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-[var(--color-sienna)] font-medium hover:underline">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
