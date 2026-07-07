# Tasks: Landing Page

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~850 (16 new, 2 modified, 1 deleted) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes (overridden: single-pr) |
| Suggested split | Single PR (size:exception required) |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation + i18n + Canvas components | PR 1 | Route restructure, layout, i18n, canvas animations |
| 2 | Landing sections + Entry + Verification | PR 1 | Sections, entry point, globals.css, build check |

## Phase 1: Foundation / Route Restructuring

- [ ] 1.1 Delete `app/(chat)/page.tsx` (resolves route conflict at `/`)
- [ ] 1.2 Create `app/(landing)/layout.tsx` (minimal layout, no sidebar/auth)
- [ ] 1.3 Modify `app/(auth)/auth.config.ts`: change `newUser` from `'/'` to `'/chat'`
- [ ] 1.4 Modify `app/layout.tsx`: add Instrument Sans, Instrument Serif, JetBrains Mono fonts

## Phase 2: i18n System

- [ ] 2.1 Create `lib/i18n/index.tsx` with LanguageProvider, useLanguage hook, and EN/ES translations (nav, hero, infrastructure, testimonials, cta, footer keys)

## Phase 3: Canvas Animation Components

- [ ] 3.1 Create `components/landing/animated-sphere.tsx` (Canvas 2D rotating ASCII sphere)
- [ ] 3.2 Create `components/landing/animated-tetrahedron.tsx` (Canvas 2D rotating tetrahedron)
- [ ] 3.3 Create `components/landing/animated-wave.tsx` (Canvas 2D sine wave)

## Phase 4: Landing Sections

- [ ] 4.1 Create `components/landing/navigation.tsx` (fixed nav, glassmorphism on scroll, mobile overlay with hamburger)
- [ ] 4.2 Create `components/landing/hero-section.tsx` (full-viewport hero, animated text, word carousel, AnimatedSphere)
- [ ] 4.3 Create `components/landing/infrastructure-section.tsx` (stats + location carousel)
- [ ] 4.4 Create `components/landing/testimonials-section.tsx` (quote carousel + logo marquee)
- [ ] 4.5 Create `components/landing/cta-section.tsx` (CTA with spotlight + AnimatedTetrahedron)
- [ ] 4.6 Create `components/landing/footer-section.tsx` (three-column grid + AnimatedWave)

## Phase 5: Entry Point

- [ ] 5.1 Create `app/(landing)/page.tsx` (composes all sections inside LanguageProvider)
- [ ] 5.2 Add landing CSS animations to `app/globals.css` (marquee keyframes, char-in animation, noise overlay utility)

## Phase 6: Verification

- [ ] 6.1 Run `pnpm build` and verify no errors
- [ ] 6.2 Verify `/` renders landing page, `/login` and `/chat` still work
