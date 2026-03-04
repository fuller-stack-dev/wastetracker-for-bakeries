# WasteTracker for Bakeries

Track bakery waste in seconds. See real-time dollar impact. Cut waste by 20-30% in your first month.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Backend:** Convex (real-time DB + serverless functions)
- **Auth:** Clerk
- **Payments:** Stripe (Free 14d trial → Starter $29/mo → Pro $79/mo)
- **Email:** Resend (weekly digest)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page (hero, features, pricing, testimonials) |
| `/dashboard` | Today's waste at a glance — stats, 7-day chart, recent entries |
| `/log` | 3-step waste logging form — product → quantity → reason |
| `/analytics` | Daily totals chart, by-reason breakdown, top products, CSV export |
| `/products` | CRUD product catalog with search and category filter |
| `/settings` | Bakery profile, subscription management, team, danger zone |
| `/api/stripe` | Stripe webhook endpoint |

## Getting Started

```bash
npm install
# Configure .env.local with Clerk, Convex, and Stripe keys
npm run dev
```

## Convex Schema

- **bakeries** — name, ownerId, plan, stripeCustomerId, trialEndsAt
- **products** — bakeryId, name, unit, costPerUnit, category
- **wasteEntries** — bakeryId, productId, quantity, reason, loggedBy, loggedAt, dollarValue

## Design

- **Palette:** Sienna (#C4633A) primary, Organic Green (#4A7C59) secondary, Cream (#FAF7F2) background
- **Fonts:** Playfair Display (headings), Plus Jakarta Sans (body)
- **Mobile-first** responsive layout with collapsible sidebar
