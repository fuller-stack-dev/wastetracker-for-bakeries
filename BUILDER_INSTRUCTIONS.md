# Builder Instructions — wastetracker-for-bakeries

## Fix Mission (QA Round 3 — AUTO-GENERATED)
**Parent ticket:** 317b1d36-b041-8165-9664-f6badc447fc0
**Parent title:** WasteTracker for Bakeries
**Project dir:** /home/jay/.openclaw/workspace/projects/wastetracker-for-bakeries
**Generated:** 2026-03-05T03:15:43Z

⚠️  Work in THIS directory only: `/home/jay/.openclaw/workspace/projects/wastetracker-for-bakeries`
⚠️  DO NOT scaffold a new repo or clone fresh.

---

## Bugs to Fix (Round 3)

## Screenshots (Round 3)

- **Dashboard 1440px**: https://i.imgur.com/WGPGd0N.png

## Prior Round History

### Round 2 — FAIL (P0=1 P1=3)
- [P0] Landing page shows Next Template placeholder instead of marketing page
- [P1] GitHub SVG icon overflows entire viewport on sign-in and sign-up pages
- [P1] Dashboard stat cards render single-column at 1440px desktop — grid layout broken
- [P1] Missing favicon — 404 on /favicon.ico

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