# Design: Landing Page

## Technical Approach

Route group isolation via `app/(landing)/` — a new route group with minimal layout (no sidebar, no auth gating) that resolves to `/`. Remove the empty `app/(chat)/page.tsx` to avoid route conflict. Redirect `auth.config.ts` `newUser` to `/chat`. Landing is self-contained: section components under `components/landing/`, custom i18n via React Context in `lib/i18n/`, canvas 2D animations inline (no Three.js). Fonts loaded via `next/font/google` in root layout.

## Architecture Decisions

| Option | Alternatives | Decision |
|--------|-------------|----------|
| `(landing)` route group | Modify `(chat)` layout | Isolated layout without sidebar/auth — `(chat)` wraps everything in SidebarProvider + DataStreamProvider |
| React Context i18n | next-intl, react-i18next | Scope-limited (EN/ES only), no route-level i18n needed, avoids dep bloat |
| Canvas 2D API | Three.js, Lottie, Framer Motion | Zero additional deps, ASCII/low-poly aesthetic per spec, framer‑motion already available for stagger/marquee |
| Fonts in root layout | Local fonts, per-route fonts | `next/font/google` at root is existing pattern (Geist), adds Instrument Sans/Serif + JetBrains Mono as CSS variables |
| E2E only | Unit/component tests | Matching project testing pattern — Playwright for full page assertions |

## Component Tree

```
app/(landing)/layout.tsx          ← minimal layout, no ThemeProvider/SessionProvider needed
└── app/(landing)/page.tsx
    └── LanguageProvider          ← wraps all children, provides locale + translations
        ├── Navigation            ← fixed header, glassmorphism on scroll, mobile overlay
        ├── HeroSection
        │   ├── TypeWriter        ← stagger character reveal + word carousel
        │   └── AnimatedSphere    ← Canvas 2D rotating ASCII sphere
        ├── InfrastructureSection
        │   ├── StatsCounter      ← count-up animation on scroll
        │   └── LocationCarousel  ← auto-rotate highlight CSS animation
        ├── TestimonialsSection
        │   ├── QuoteCarousel     ← auto-advance every 5s with dot nav
        │   └── LogoMarquee       ← horizontal scroll with framer-motion
        ├── CtaSection
        │   ├── AnimatedTetrahedron  ← Canvas 2D rotating tetrahedron + cursor spotlight
        │   └── SpotlightOverlay     ← radial gradient following mousemove
        └── FooterSection
            ├── AnimatedWave      ← Canvas 2D sine wave background
            └── FooterGrid        ← brand + company + legal columns
```

## Data Flow

```
User clicks EN/ES in Navigation
  └──→ LanguageProvider.setLanguage(locale)
        ├──→ localStorage.setItem("locale", locale)
        ├──→ React state update (locale)
        └──→ All consumers re-render with translations[locale]

On mount:
  localStorage.getItem("locale")
    ├── found → set that locale
    └── null  → navigator.language → match "es" prefix → ES / fallback EN

Auth redirect:
  auth.config.ts pages.newUser = "/chat"
    └──→ Auth callback on new user sign-up → redirects to /chat instead of /
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/(landing)/page.tsx` | Create | Landing page entry — composes all sections inside LanguageProvider |
| `app/(landing)/layout.tsx` | Create | Minimal layout — no ThemeProvider/SessionProvider needed |
| `app/(chat)/page.tsx` | Delete | Removes route conflict with `/` |
| `app/layout.tsx` | Modify | Add Instrument Sans, Instrument Serif, JetBrains Mono via next/font/google |
| `app/(auth)/auth.config.ts` | Modify | `newUser` from `\`${base}/\`` → `\`${base}/chat\`` |
| `app/globals.css` | Modify | Add `@keyframes` for landing animations (word-cycle, location-highlight, count-up) |
| `components/landing/navigation.tsx` | Create | Fixed nav: glassmorphism on scroll, hamburger → full-screen overlay <768px |
| `components/landing/hero-section.tsx` | Create | Full-viewport hero: stagger char reveal + word carousel + AnimatedSphere |
| `components/landing/infrastructure-section.tsx` | Create | Two-column: stats (count-up) + location carousel |
| `components/landing/testimonials-section.tsx` | Create | Quote carousel (5s auto-advance, dot nav) + logo marquee |
| `components/landing/cta-section.tsx` | Create | Two-column CTA with spotlight + AnimatedTetrahedron |
| `components/landing/footer-section.tsx` | Create | Three-column grid with AnimatedWave background |
| `components/landing/animated-sphere.tsx` | Create | Canvas 2D rotating wireframe sphere (requestAnimationFrame loop) |
| `components/landing/animated-tetrahedron.tsx` | Create | Canvas 2D rotating tetrahedron with cursor spotlight param |
| `components/landing/animated-wave.tsx` | Create | Canvas 2D animated sine wave |
| `lib/i18n/index.tsx` | Create | LanguageProvider + useLanguage hook + EN/ES translation maps |

## Interfaces / Contracts

```typescript
// lib/i18n/index.ts
type Locale = "en" | "es";

interface Translations {
  nav: { infrastructure: string; testimonials: string; contact: string; start: string };
  hero: { heading: string[]; words: string[]; description: string; cta: string };
  infrastructure: { title: string; stats: { value: string; label: string }[]; locations: string[] };
  testimonials: { quotes: { text: string; author: string; role: string; metric: string }[] };
  cta: { heading: string; description: string; primary: string; secondary: string };
  footer: { brand: string; company: string[]; legal: string[]; copyright: string };
}

// Canvas component contract
interface CanvasAnimationProps {
  className?: string;
  width?: number;
  height?: number;
}
```

All canvas components follow the same pattern: `useRef<HTMLCanvasElement>`, `useEffect` with `requestAnimationFrame` loop, resize handler via `ResizeObserver`, cleanup on unmount.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| E2E | Landing renders at `/` with all sections | Playwright: `page.goto("/")`, assert visible sections by test IDs |
| E2E | Language switch | Click EN/ES toggle, assert copy changes to ES |
| E2E | Navigation links | Click "Start" → assert URL `/login` |
| E2E | Mobile menu | Set viewport 375px, open hamburger, assert overlay visible |
| E2E | `/chat`, `/login`, `/register` still work | Navigate to each, assert no regression |
| E2E | `pnpm build` | CI gate — build must succeed |

## Migration / Rollout

No migration required. Deploy as-is — landing page replaces an empty `/`. Existing users on `/` will see the landing page; they navigate to `/chat` to continue chatting.

## Open Questions

- None — spec and proposal cover all decisions.
