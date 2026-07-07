# Design: Complete Landing Page

## Technical Approach

Implement the 7 commented-out landing sections as independent `"use client"` components following the established pattern (`hero-section.tsx`, `infrastructure-section.tsx`). Each component owns its state, animations, and i18n keys. The page layout is updated to import and slot them between `InfrastructureSection` and `TestimonialsSection`. CSS additions follow the existing `@keyframes` + `@utility` convention in `globals.css`.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| Animation engine | `framer-motion` vs `motion/react` vs IntersectionObserver + CSS | Hybrid: CSS `@keyframes` for reveals (cheap), `motion/react` for complex transitions (tabs, pricing toggle) | `motion/react` already in deps; CSS animations cheaper for scroll-triggered reveals; avoids layout thrash |
| i18n structure | Flat keys vs nested objects | Nested objects under section namespace | Matches `infrastructure.stats`, `testimonials.items` pattern |
| Count-up animation | `requestAnimationFrame` vs `setInterval` | `requestAnimationFrame` with ease-out cubic | Already used in `infrastructure-section.tsx`, smooth on 60fps |
| Component state per section | Shared context vs isolated `useState` | Isolated `useState` per component | No cross-section state dependencies; keeps components independent |
| Code window animation | Typewriter per char vs batch line reveal | Per-char reveal for active line, batch line reveal for code | Matches hero character reveal pattern; gives polished "typing" feel |

## Component Tree

```
LanguageProvider
└── Navigation
└── main
    ├── HeroSection          (existing)
    ├── InfrastructureSection (existing)
    ├── FeaturesSection      ← NEW
    ├── HowItWorksSection    ← NEW
    ├── MetricsSection       ← NEW
    ├── IntegrationsSection  ← NEW
    ├── SecuritySection      ← NEW
    ├── DevelopersSection    ← NEW
    ├── PricingSection       ← NEW
    ├── TestimonialsSection  (existing)
    └── CtaSection           (existing)
└── FooterSection            (existing)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `components/landing/features-section.tsx` | Create | 4 animated cards with inline SVG, numbered 01-04, scroll reveal |
| `components/landing/how-it-works-section.tsx` | Create | 3-step clickable tabs with code preview, dark bg, auto-rotate 5s |
| `components/landing/metrics-section.tsx` | Create | 4 count-up counters + live timestamp, IntersectionObserver trigger |
| `components/landing/integrations-section.tsx` | Create | 12 items in dual scrolling marquees (fwd + reverse) |
| `components/landing/security-section.tsx` | Create | 2-col: copy + cert badges / feature cards with Lucide icons |
| `components/landing/developers-section.tsx` | Create | 2-col: copy/features / code playground with 3 tabs + copy button |
| `components/landing/pricing-section.tsx` | Create | 3 pricing cards with billing toggle, "Most Popular" badge |
| `app/(landing)/page.tsx` | Modify | Import + slot 7 new sections between Infrastructure and Testimonials |
| `lib/i18n/index.tsx` | Modify | Add `Translations` keys for all 7 sections in EN + ES |
| `app/globals.css` | Modify | Add `@keyframes` + `@utility` for `marquee-reverse`, `code-char-reveal`, `code-line-reveal`, `text-stroke`, `fade-in-up` |

## CSS Additions (app/globals.css)

```css
/* New keyframes */
@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
@keyframes code-char-reveal {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes code-line-reveal {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes count-up-fade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* New utilities */
@utility marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}
@utility code-char-reveal {
  animation: code-char-reveal 0.05s ease both;
}
@utility code-line-reveal {
  animation: code-line-reveal 0.3s ease both;
}
@utility text-stroke {
  -webkit-text-stroke: 1px currentColor;
  color: transparent;
}
@utility fade-in-up {
  animation: count-up-fade 0.25s var(--ease-spring) both;
}
```

## i18n Key Structure

```typescript
// Add to Translations interface:
features: {
  eyebrow: string;
  title: string;
  description: string;
  items: { number: string; title: string; description: string }[];
};
howItWorks: {
  eyebrow: string;
  title: string;
  steps: { title: string; description: string; code: string[] }[];
};
metrics: {
  label: string;
  items: { value: string; suffix: string; label: string }[];
};
integrations: {
  title: string;
  description: string;
  items: { name: string; category: string }[];
};
security: {
  eyebrow: string;
  title: string;
  description: string;
  certifications: string[];
  features: { icon: string; title: string; description: string }[];
};
developers: {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  tabs: { id: string; label: string; code: string[] }[];
  copy: string;
  copied: string;
};
pricing: {
  title: string;
  monthly: string;
  annual: string;
  plans: {
    name: string;
    price: string;
    annualPrice: string;
    description: string;
    popular: boolean;
    features: string[];
    cta: string;
  }[];
  customNote: string;
};
```

## Interfaces / Contracts

All 7 components export a named function (e.g. `FeaturesSection`) with no props — they read locale via `useLanguage()`. Each uses IntersectionObserver internally; no shared observer context needed.

## Testing Strategy

Not applicable — landing sections are presentational. Verify via `pnpm build` and visual inspection. E2E scope limited if interactive elements (pricing toggle, code tabs) need functional coverage.

## Migration / Rollout

No migration required. Sections render at `/` immediately after deploy. Existing sections are unchanged. Rollback: revert page.tsx imports.

## Open Questions

- None — all design decisions are resolved from existing patterns.
