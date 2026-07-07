# Proposal: Landing Page

## Intent

Build a landing page at `/` as the chatbot's public face, attracting users and providing clear onboarding to login/register. The root route currently returns an empty page. Follows the Optimus AI Platform design reference.

## Scope

### In Scope
- Landing page: Navigation, Hero, Infrastructure, Testimonials, CTA, Footer
- EN/ES bilingual support via custom i18n system
- Canvas-based ASCII animations: Sphere, Tetrahedron, Wave
- Route restructuring: create `app/(landing)/` route group, remove `app/(chat)/page.tsx`
- Update `auth.config.ts` `newUser` redirect from `/` to `/chat`
- New font loading: Instrument Sans, Instrument Serif, JetBrains Mono

### Out of Scope
- External 3D libs (canvas-only animations)
- Pricing section, Features section, How-It-Works section (deferred from reference)
- Backend changes or new API routes
- Changes to existing chat functionality or auth flow beyond the redirect
- SEO or metadata optimization

## Capabilities

### New Capabilities
- `landing-page`: Public-facing landing page with hero, infrastructure showcase, testimonials, CTA, and footer. Full EN/ES localization. Canvas-based ASCII animations.

### Modified Capabilities
None — this is a net-new capability.

## Approach

1. Create `app/(landing)/` route group with its own layout (minimal, no sidebar)
2. Remove `app/(chat)/page.tsx` to resolve route conflict with `/`
3. Update `auth.config.ts` `newUser` from `'/'` to `'/chat'`
4. Create `components/landing/` with all section components
5. Create `lib/i18n/` with LanguageProvider and EN/ES translations
6. Add three Google Fonts to root layout
7. All canvas animations are self-contained React components using Canvas 2D API

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/(landing)/page.tsx` | New | Landing page entry point |
| `app/(landing)/layout.tsx` | New | Landing-specific layout |
| `app/(chat)/page.tsx` | Removed | Route conflict resolution |
| `app/layout.tsx` | Modified | Add new fonts |
| `app/(auth)/auth.config.ts` | Modified | Change newUser redirect |
| `components/landing/*.tsx` | New | Section components |
| `lib/i18n/index.tsx` | New | i18n provider |
| `app/globals.css` | Modified | Landing animations |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Route conflict with existing `/` page | Low | Remove `app/(chat)/page.tsx` |
| Font loading performance | Low | Use next/font/google with subset: latin |
| Canvas perf on low-end devices | Low | Lightweight, no external deps |

## Rollback Plan

1. Restore `app/(chat)/page.tsx` if removed
2. Remove `app/(landing)/` route group
3. Revert `auth.config.ts` `newUser` to `'/'`

## Success Criteria

- [ ] Landing page renders at `/` with all sections
- [ ] Language switcher toggles between EN/ES
- [ ] Canvas animations render without errors
- [ ] Navigation links work: "Start" → `/login`, section anchors work
- [ ] `/chat`, `/login`, `/register` continue to work normally
- [ ] `pnpm build` succeeds
