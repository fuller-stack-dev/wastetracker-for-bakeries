import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/log", "/analytics", "/products", "/settings"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // If Clerk is configured, use its middleware
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  if (clerkKey && !clerkKey.includes("placeholder")) {
    // Dynamically use Clerk middleware when available
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { clerkMiddleware } = require("@clerk/nextjs/server");
      return clerkMiddleware()(request, {} as any);
    } catch {
      // Clerk not available, fall through
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
