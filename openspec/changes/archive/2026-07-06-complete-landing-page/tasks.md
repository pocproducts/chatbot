# Tasks: Complete Landing Page

## Review Workload Forecast

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

7 new components + 3 modified files. Pure presentational, no backend. Likely 800–1200+ changed lines. Requires `size:exception` for single-PR delivery.

## Phase 1: Foundation (CSS + i18n)

- [x] 1.1 Add `@keyframes` + `@utility` blocks to `app/globals.css`: marquee-reverse, code-char-reveal, code-line-reveal, text-stroke, fade-in-up, dev-char-reveal
- [x] 1.2 Add `Translations` interface keys (features, howItWorks, metrics, integrations, security, developers, pricing) + EN/ES locale objects in `lib/i18n/index.tsx`

## Phase 2: Section Components

- [x] 2.1 Create `components/landing/features-section.tsx` — 4 animated cards with inline SVG, numbered 01-04, IntersectionObserver scroll reveal
- [x] 2.2 Create `components/landing/how-it-works-section.tsx` — dark bg, 3-step tabs with code preview, auto-rotate 5s via motion/react
- [x] 2.3 Create `components/landing/metrics-section.tsx` — 4 animated counters with requestAnimationFrame ease-out + live timestamp
- [x] 2.4 Create `components/landing/integrations-section.tsx` — 12 items in dual marquees (forward + reverse) via CSS animation
- [x] 2.5 Create `components/landing/security-section.tsx` — 2-col: copy/cert badges + feature cards with Lucide icons
- [x] 2.6 Create `components/landing/developers-section.tsx` — 2-col: copy/features + code playground with 3 tabs + copy button
- [x] 2.7 Create `components/landing/pricing-section.tsx` — 3 pricing cards with billing toggle, "Most Popular" badge

## Phase 3: Wiring

- [x] 3.1 Import and slot all 7 sections in `app/(landing)/page.tsx` between InfrastructureSection and TestimonialsSection

## Phase 4: Verification

- [x] 4.1 Run `pnpm build` — zero errors
- [ ] 4.2 Visual check: all sections render at `/` with correct animations and language toggle (manual — visual only)
