"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "@/lib/convex-api";
import { Id } from "@/lib/convex-api";

// Check if Convex is actually configured (not placeholder)
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const isConvexConfigured = CONVEX_URL && !CONVEX_URL.includes("placeholder");

interface AppContextType {
  userId: string | null;
  bakeryId: Id<"bakeries"> | null;
  bakeryName: string;
  plan: string;
  trialDaysLeft: number;
  isDemo: boolean;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType>({
  userId: null,
  bakeryId: null,
  bakeryName: "Golden Crust Bakery",
  plan: "trial",
  trialDaysLeft: 11,
  isDemo: true,
  isLoading: false,
});

export function useApp() {
  return useContext(AppContext);
}

function ConvexAppProvider({ children }: { children: ReactNode }) {
  // When Convex is configured, try to get user/bakery from backend
  // For now, use a placeholder userId — in production this comes from Clerk
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const hasClerk = clerkKey && !clerkKey.includes("placeholder");

  // If Clerk is configured, we'd get userId from useUser() — for now demo
  const userId = hasClerk ? null : "demo-user";

  const bakery = useQuery(
    api.bakeries.getBakery,
    userId ? { userId } : "skip"
  );

  const value = useMemo<AppContextType>(() => {
    if (!userId) {
      return {
        userId: null,
        bakeryId: null,
        bakeryName: "Golden Crust Bakery",
        plan: "trial",
        trialDaysLeft: 11,
        isDemo: true,
        isLoading: false,
      };
    }

    if (bakery === undefined) {
      return {
        userId,
        bakeryId: null,
        bakeryName: "",
        plan: "trial",
        trialDaysLeft: 14,
        isDemo: false,
        isLoading: true,
      };
    }

    if (bakery === null) {
      return {
        userId,
        bakeryId: null,
        bakeryName: "",
        plan: "trial",
        trialDaysLeft: 14,
        isDemo: false,
        isLoading: false,
      };
    }

    const trialDaysLeft = bakery.trialEndsAt
      ? Math.max(0, Math.ceil((bakery.trialEndsAt - Date.now()) / (24 * 60 * 60 * 1000)))
      : 0;

    return {
      userId,
      bakeryId: bakery._id,
      bakeryName: bakery.name,
      plan: bakery.plan,
      trialDaysLeft,
      isDemo: false,
      isLoading: false,
    };
  }, [userId, bakery]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function DemoAppProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AppContextType>(
    () => ({
      userId: "demo-user",
      bakeryId: null,
      bakeryName: "Golden Crust Bakery",
      plan: "trial",
      trialDaysLeft: 11,
      isDemo: true,
      isLoading: false,
    }),
    []
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  if (!isConvexConfigured) {
    return <DemoAppProvider>{children}</DemoAppProvider>;
  }
  return <ConvexAppProvider>{children}</ConvexAppProvider>;
}
