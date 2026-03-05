# NEXT-TEMPLATE STARTER PACK

Bare-bones infrastructure for high-performance apps.

## Tech Stack
- **Next.js 15 (RC)**: App Router, Server Actions.
- **Convex**: Real-time DB & Functions.
- **Convex Auth**: Pre-configured GitHub & Password providers.
- **Stripe**: Initialized client in `src/lib/stripe.ts`.

## Structure
- `/convex`: DB schema and Auth config.
- `/src/app`: Next.js routes.
- `/src/lib`: Shared utilities (Stripe, etc).

## Setup
1. `npm install`
2. `npx convex dev` (to set up your deployment)
3. Add env vars to `.env.local`:
   - `CONVEX_DEPLOYMENT`
   - `NEXT_PUBLIC_CONVEX_URL`
   - `STRIPE_SECRET_KEY`
   - `AUTH_GITHUB_ID`
   - `AUTH_GITHUB_SECRET`
