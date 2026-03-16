"use client";

import { useQuery as useConvexQuery, useMutation as useConvexMutation } from "convex/react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const isConvexConfigured = CONVEX_URL && !CONVEX_URL.includes("placeholder");

/**
 * Safe useQuery that returns undefined when Convex is not configured.
 * This prevents crashes during SSR/SSG when no ConvexProvider exists.
 */
export function useSafeQuery(query: any, args: any) {
  // Always call the hook (hooks rules), but skip when not configured
  const result = useConvexQuery(query, isConvexConfigured ? args : "skip");
  if (!isConvexConfigured) return undefined;
  return result;
}

/**
 * Safe useMutation that returns a no-op when Convex is not configured.
 */
export function useSafeMutation(mutation: any) {
  const mutate = useConvexMutation(mutation);
  if (!isConvexConfigured) {
    return async (..._args: any[]) => {
      console.warn("Convex not configured, mutation skipped");
    };
  }
  return mutate;
}
