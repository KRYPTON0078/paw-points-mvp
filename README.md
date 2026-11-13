# Paw Points
Customer-facing, local-first pet café loyalty MVP. Demo café: Paw & Brew Macau; user: Alex. Sample profiles and fictional leaderboard participants.

## Run
Node 20.9+; `npm install`, `npm run dev`, then http://localhost:3000.
`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Next.js App Router, TypeScript, Tailwind, Zustand persistence, Lucide and Motion. Responsive cream/orange design with reusable components. Business transitions are isolated in src/lib/engine.ts; replace the Zustand persistence adapter with a server repository for production.

## Walkthrough
Order coffee with DEMO PAYMENT → follow Mochi → set primary → simulated check-in → request and simulate staff verification → use explicitly labeled +100 XP presentation accelerator → order enough coffee to reach 150 PP → redeem interaction booking → inspect wallet and refresh. Coffee purchases never grant XP. Reset is under Profile.

## Limitations
No payments, authentication, staff service or actual bookings. Client state can be modified by a browser user. Photos require network access and are illustrative, not verified café animals. Care remains pending staff fulfillment. Monthly leaderboard derives from dated activity, independent of lifetime XP. Interaction verification is simulated. Adoption information requires independent human review, never transfers an animal. No merchant dashboard.

## GitHub
Local delivery only until publication is authorized. Intended repository: paw-points-mvp. After verifying your account and destination: `gh repo create paw-points-mvp --private --source=. --remote=origin`, then `git push -u origin main`.

## Languages
The header language selector supports 简体中文, 繁體中文, English, and Português (European Portuguese). The selected language is saved as `paw-points-language` in localStorage and preserved across navigation and reloads. Translations include page content, product names, relationship levels, rewards, activity history, and success/error messages. Brand names, cat names, PP/XP identifiers and currency codes stay unchanged. Translation data lives in `src/lib/translations.json`.
