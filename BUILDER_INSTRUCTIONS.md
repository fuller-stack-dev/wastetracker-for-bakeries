# Builder Instructions — wastetracker-wire-backend-fix-css-import-implement-auth-flow

Source: Postgres tasks.design_plan (page_id: 319b1d36-b041-8169-a095-c24b1c55eaed)


## QA Round 1 Bug Report
P0 CSS @import order causes 500 in dev mode: @import url() for Google Fonts was placed after @tailwind directives in globals.css. Turbopack strict CSS parser rejects this, returning 500 on every page in dev mode. Fix: move @import url() to the very top of globals.css. NOTE: this was hot-fixed during QA.
P1 Zero backend wiring: All 5 app pages use hardcoded demo data arrays. No useQuery/useMutation calls to Convex despite schema+functions existing. Log Waste shows Logged confirmation but never persists. Products Edit/Delete buttons have no handlers. Settings Save/Upgrade/Invite/Delete are non-functional. Analytics period toggle shows identical data for all periods.
P1 No auth flow: No sign-in/sign-up pages. App routes completely unprotected. Sign Out just navigates to /. Clerk provider is placeholder-only.

## What Passed
Build succeeds. Landing page renders correctly. Responsive layout works at 375/768/1440px. Color palette and typography correct. Zero console errors. Hero image renders via Next.js Image. Sidebar nav with active states works. Mobile hamburger menu works. Visual design quality is high.

## Screenshots
Landing 1440: https://i.imgur.com/38wrGDg.png | Dashboard: https://i.imgur.com/UNVquID.png | Log: https://i.imgur.com/astpaoW.png | Analytics: https://i.imgur.com/oX2T7Xk.png | Products: https://i.imgur.com/2ZBQdpq.png | Landing 375: https://i.imgur.com/dkHIfGI.png