"use client";

import { ReactNode } from "react";

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

function isPlaceholder(key: string) {
  return !key || key.includes("placeholder");
}

export function ClerkClientProvider({ children }: { children: ReactNode }) {
  if (isPlaceholder(CLERK_KEY)) {
    return <>{children}</>;
  }

  // Dynamic import to avoid build errors when Clerk isn't configured
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ClerkProvider } = require("@clerk/nextjs");
  return <ClerkProvider publishableKey={CLERK_KEY}>{children}</ClerkProvider>;
}
