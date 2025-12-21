# 🚀 Deploy Checklist (Serpify)

Use this before shipping to prod or setting up local auth.

## Google OAuth
- [ ] Authorized redirect URIs include:
  - `https://serpify.io/api/auth/callback/google`
  - `http://localhost:3001/api/auth/callback/google`
  - `http://127.0.0.1:3001/api/auth/callback/google` (if used)
- [ ] Authorized JavaScript origins include:
  - `https://serpify.io`
  - `http://localhost:3001`
  - `http://127.0.0.1:3001`

## Env Vars (Prod / Vercel)
- [ ] `DATABASE_URL` (prod Postgres)
- [ ] `PRISMA_DATABASE_URL` (Accelerate, optional)
- [ ] `AUTH_SECRET`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `NEXTAUTH_URL=https://serpify.io`
- [ ] Stripe (when enabled): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_PRO`, `STRIPE_PRICE_ID_AGENCY`
- [ ] AI/limits (when enabled): `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Env Vars (Local Dev)
- [ ] `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/serpify_dev` (or your dev DB)
- [ ] `AUTH_SECRET` set
- [ ] `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (same client)
- [ ] `NEXTAUTH_URL=http://localhost:3001`
- [ ] Run dev on matching port: `PORT=3001 npm run dev`

## DB/Prisma
- [ ] `npx prisma db push` against the target DB
- [ ] `npx prisma generate` (postinstall covers prod)

## UI/UX Post-Auth
- [ ] Header dropdown not clipped (z-index and overflow ok)
- [ ] Login page shows “Serpify”
- [ ] Profile page accessible (name/email/plan)
- [ ] Pricing + Upgrade visible on all breakpoints

## Final Sanity
- [ ] Build passes on Vercel (postinstall runs `prisma generate`)
- [ ] OAuth sign-in works on prod domain
- [ ] No horizontal scroll on mobile
