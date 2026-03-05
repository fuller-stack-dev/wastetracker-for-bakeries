# Builder Instructions — wastetracker-for-bakeries

## Fix Mission (QA Round 2 — AUTO-GENERATED)
**Parent ticket:** 317b1d36-b041-8165-9664-f6badc447fc0
**Parent title:** WasteTracker for Bakeries
**Project dir:** /home/jay/.openclaw/workspace/projects/wastetracker-for-bakeries
**Generated:** 2026-03-05T02:51:57Z

⚠️  Work in THIS directory only: `/home/jay/.openclaw/workspace/projects/wastetracker-for-bakeries`
⚠️  DO NOT scaffold a new repo or clone fresh.

---

## Bugs to Fix (Round 2)

### P0 — Blockers

#### P0-1: Landing page shows Next Template placeholder instead of marketing page
src/app/page.tsx contains a placeholder Next Template page that shadows the real marketing landing at src/app/(marketing)/page.tsx. The root / route never renders the Hero, Features, Pricing, or Footer components. Fix: delete src/app/page.tsx so the (marketing) route group serves / correctly.

### P1 — Major

#### P1-1: GitHub SVG icon overflows entire viewport on sign-in and sign-up pages
The GitHub Octocat SVG inside the Continue with GitHub button on both /sign-in and /sign-up pages renders at full intrinsic size (~500px), filling the viewport. The SVG element lacks width/height constraints. Fix: add explicit w-5 h-5 class to the GitHub SVG/img element in src/app/(auth)/sign-in/page.tsx and src/app/(auth)/sign-up/page.tsx.

#### P1-2: Dashboard stat cards render single-column at 1440px desktop — grid layout broken
The stat cards grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4) in src/app/(app)/dashboard/page.tsx renders as a single column at 1440px viewport width. The grid classes are not taking effect at lg breakpoint. Verify Tailwind config and container width. Cards should display as a 4-column row on desktop.

#### P1-3: Missing favicon — 404 on /favicon.ico
Console error: Failed to load resource: 404 on /favicon.ico. No favicon file exists in the public directory. Fix: add a favicon.ico or favicon.svg to public/ and reference it in root layout metadata.

## Screenshots (Round 2)

- **Dashboard 1440px — single-column grid bug**: https://i.imgur.com/sjAc4A2.png
- **Sign-in 375px — GitHub SVG overflow**: https://i.imgur.com/xVJ0WDN.png

## Completion Protocol

1. Fix every P0 and P1 above — surgical edits only, no refactoring unrelated code.
2. Run `npm run build` — must exit 0.
3. Commit: `git add -A && git commit -m 'fix: <desc>' && git push`
4. Mark fix ticket done + re-queue parent:
   ```bash
   bash scripts/set-ticket-status.sh <FIX_TICKET_ID> done fix-done
   bash scripts/set-ticket-status.sh 317b1d36-b041-8165-9664-f6badc447fc0 ready_for_testing fix-applied
   ```
5. Discord: 🔧 Fix applied — re-queuing QA: WasteTracker for Bakeries