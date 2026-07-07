# Proposal: Complete Landing Page

## Intent

Extend the existing landing page with the 7 sections currently commented out — Features, How It Works, Metrics, Integrations, Security, Developers, Pricing — to match the reference design. The landing page works but is incomplete compared to the spec.

## Scope

### In Scope
- Build 7 section components in `components/landing/` following reference patterns (inline SVG animations, IntersectionObserver reveals, dark sections, responsive grids)
- Add EN/ES translations for all 7 new sections in `lib/i18n/index.tsx`
- Add CSS utilities to `app/globals.css`: `marquee-reverse`, `font-display`, `code-char-reveal`, `text-stroke`, plus fade-in animation classes
- Uncomment and wire all sections in `app/(landing)/page.tsx`

### Out of Scope
- New backend APIs or database changes
- SEO/metadata optimization
- Performance benchmarking

## Capabilities

### New Capabilities
None — all 7 sections are presentational additions to the existing landing page.

### Modified Capabilities
- `landing-page`: Extended with 7 additional sections (Features, HowItWorks, Metrics, Integrations, Security, Developers, Pricing). No spec-level behavioral changes — purely presentational.

## Approach

1. Create each section as a standalone `components/landing/<name>-section.tsx` with client interactivity where needed (IntersectionObserver, tabs, pricing toggle, counter animation)
2. Follow the existing hero-section pattern: `"use client"`, `useLanguage()` hook, dark bg via `bg-zinc-950` classes, Tailwind v4 responsive grids
3. Add i18n keys under new section namespaces (features, howItWorks, metrics, integrations, security, developers, pricing) — append to the `Translations` interface and both locale objects
4. Add CSS `@keyframes` + `@utility` blocks to `globals.css` for scroll-triggered reveals and marquee variants
5. Update `page.tsx` — import + slot sections between existing `InfrastructureSection` and `TestimonialsSection`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/landing/*.tsx` | New (7) | Section components |
| `lib/i18n/index.tsx` | Modified | Add translations |
| `app/globals.css` | Modified | Animation utilities |
| `app/(landing)/page.tsx` | Modified | Wire sections |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Animation perf on low-end | Low | Use CSS animations + IntersectionObserver — no heavy JS loops |
| i18n drift between EN/ES | Low | Pair translations, review side-by-side |

## Rollback Plan

1. Revert `app/(landing)/page.tsx` to remove section imports
2. Revert `lib/i18n/index.tsx` to remove new keys
3. Revert `app/globals.css` animation additions

## Success Criteria

- [ ] All 7 sections render and animate on scroll at `/`
- [ ] Language toggle switches all section copy between EN/ES
- [ ] `pnpm build` passes with no errors
- [ ] Existing sections (Hero, Infrastructure, Testimonials, CTA, Footer) remain unchanged
