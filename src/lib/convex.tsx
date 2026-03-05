"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";

function isPlaceholder(url: string) {
  return !url || url.includes("placeholder");
}

// Always create a client — if URL is placeholder, queries return undefined (skip pattern)
// This ensures ConvexProvider is always in the tree so hooks don't crash.
const FALLBACK_URL = "https://placeholder.convex.cloud";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const url = isPlaceholder(CONVEX_URL) ? FALLBACK_URL : CONVEX_URL;
    return new ConvexReactClient(url);
  }, []);

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
