# Landing Page Specification

## Purpose

Public-facing landing page at `/` that showcases the chatbot platform, drives user onboarding, and provides EN/ES bilingual support with canvas-based ASCII animations.

## Requirements

### Requirement: Landing Page Rendering

The system MUST render the landing page at `/` with all sections visible. Clicking section nav links MUST smooth-scroll to anchor IDs.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Full render | User navigates to `/` | Page loads | Hero, Infrastructure, Testimonials, CTA, Footer sections are visible |
| Smooth scroll | User clicks "Infrastructure" nav link | Scroll fires | Viewport animates to `#infrastructure` anchor |

### Requirement: Navigation

The system SHOULD render a fixed header with scroll-aware glassmorphism background. It MUST contain brand logo, section links (Infrastructure, Testimonials, Contact), EN/ES language switcher, and "Start" CTA linking to `/login`. On viewports <768px, links MUST collapse to a full-screen hamburger overlay with animated reveal.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Desktop nav | Viewport >1024px | Page renders | All links visible inline, glassmorphism applies on scroll |
| Mobile overlay | Viewport <768px | User taps hamburger | Full-screen overlay opens with staggered link animations |

### Requirement: Hero Section

The system MUST render a full-viewport hero with animated display text, a rotating word carousel (EN: create/build/scale/ship, ES: crear/construir/escalar/lanzar), and an animated ASCII sphere on a Canvas 2D element. Staggered character reveal animation MUST trigger on page load.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Load animation | Page loads | 500ms elapsed | Character reveal animation completes on heading text |
| Word rotation | User stays on page | Every 3s | Carousel cycles to next word with transition |
| Language switch | User switches to ES | Provider updates | Carousel shows crear/construir/escalar/lanzar cycle |

### Requirement: Infrastructure Section

The system MUST render a two-column section: copy on left with stats (17 data centers, 99.99% uptime, <50ms latency) and edge network location list on right. Location items MUST auto-rotate highlight every 2s using CSS animation.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Stats visible | Section scrolls into view | Animation triggers | All three stats displayed with count-up animation |
| Location highlight | 2s elapsed | Auto-rotation fires | Next location item gains highlight class |

### Requirement: Testimonials Section

The system MUST render a rotating testimonial carousel with 4 quotes. Auto-advance every 5s. Each card SHALL show author, role, company, and metric. Navigation dots MUST allow manual selection. Logo marquee below.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Auto-advance | 5s idle | Timer fires | Next testimonial slides into view |
| Manual select | User clicks dot #3 | Selection fires | Third testimonial displayed, timer resets |
| Marquee | Section visible | Continuous | Company logos scroll horizontally |

### Requirement: CTA Section

The system MUST render a two-column CTA with heading, description, "Start building free" button (links to `/login`), "Talk to sales" button (links to `/`), and an animated tetrahedron Canvas 2D element. Spotlight effect MUST follow the mouse cursor within the section bounds.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Primary CTA | User clicks "Start building free" | Navigation fires | Browser navigates to `/login` |
| Spotlight | User moves mouse over section | mousemove fires | Radial gradient follows cursor position |
| Tetrahedron | Page idle | Frame loop | Tetrahedron rotates on canvas |

### Requirement: Footer

The system MUST render a three-column grid: brand (logo, description, social links), Company links, and Legal links. Animated wave canvas MUST render as background. Bottom bar SHALL show copyright and "All systems operational" status.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Columns | Page renders | Footer in viewport | Three equal-width columns visible |
| Wave animation | Continuous | Frame loop | Animated sine wave renders on canvas behind content |

### Requirement: Language System

A LanguageProvider MUST load locale from localStorage with fallback to browser language (default EN). MUST support EN and ES. Theme features MUST NOT be included in the landing page.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| localStorage hit | `locale=es` in localStorage | Provider initializes | ES translations applied |
| Browser fallback | No stored locale, browser `es-MX` | Provider initializes | ES selected |
| Default | No stored locale, browser `fr-FR` | Provider initializes | EN selected (default) |

### Requirement: Canvas Animations

Each animation (sphere, tetrahedron, wave) MUST be a self-contained React component using Canvas 2D API. Each MUST handle window resize and MUST clean up animation frames on unmount.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Resize | Canvas mounted | Window resizes | Canvas dimensions update, re-render triggered |
| Cleanup | Component unmounts | useEffect cleanup fires | requestAnimationFrame loop cancelled via ref |

### Requirement: Responsive Design

The landing page MUST be fully responsive: mobile (<768px), tablet (768–1024px), desktop (>1024px). Mobile navigation MUST use a full-screen overlay with animated link reveals.

| Scenario | GIVEN | WHEN | THEN |
|----------|-------|------|------|
| Tablet | Viewport 768px | Render | Layout uses tablet breakpoint styles |
| Mobile menu | Viewport 375px | User opens nav | Full-screen overlay covers viewport, links animate in sequentially |
