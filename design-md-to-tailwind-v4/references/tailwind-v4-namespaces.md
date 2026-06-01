# Tailwind v4 — @theme Namespace Reference

Complete mapping of design token categories to Tailwind v4 CSS variable namespaces,
the utility classes they generate, and gotchas.

---

## How @theme Works

```css
@import "tailwindcss";

@theme {
  --color-brand: #E94560;   /* generates: bg-brand, text-brand, border-brand, ring-brand … */
}
```

- Variables defined in `@theme` become both CSS custom properties AND utility-class generators.
- Use `:root {}` for variables that are purely for internal reference (no utility needed).
- `@theme inline { --color-x: var(--y); }` — links a theme token to a runtime CSS variable
  (needed for themeable colors that flip in dark mode).
- Variables MUST be top-level; nesting inside selectors/media queries is not allowed in `@theme`.

---

## Namespace → Utility Mapping

### Colors  `--color-{name}`

```css
@theme {
  --color-primary:   #1A1C1E;
  --color-secondary: #6C7278;
  --color-tertiary:  #B8422E;
  --color-neutral:   #F7F5F2;
  --color-white:     #FFFFFF;
  --color-black:     #000000;
}
```

Generated utilities: `bg-primary`, `text-primary`, `border-primary`, `ring-primary`,
`outline-primary`, `fill-primary`, `stroke-primary`, `shadow-primary`, `from-primary`,
`via-primary`, `to-primary`, `decoration-primary`, `accent-primary`, `caret-primary`.

**Naming conventions:**
- Semantic names preferred: `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`
- Scale names when palette is large: `brand-50`, `brand-100` … `brand-950`
- Interaction states via separate tokens: `primary-hover`, `primary-active`, `primary-disabled`

**Color formats:**
- Hex: `#1A1C1E` — safe, widely understood
- oklch: `oklch(0.72 0.11 221.19)` — preferred for P3 displays, supported natively in v4
- `color-mix(in oklab, #B8422E 80%, transparent)` — valid for tints/shades

---

### Font Families  `--font-{name}`

```css
@theme {
  --font-sans:    "Public Sans", system-ui, sans-serif;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;
  --font-serif:   "Playfair Display", Georgia, serif;
}
```

Generated utilities: `font-sans`, `font-display`, `font-mono`, `font-serif`.

**Rule:** One `--font-*` per unique font *family* (not per typography scale level).
Extract distinct families from the DESIGN.md `typography` block and deduplicate.

---

### Type Scale  `--text-{scale}`

Each font-size token has an optional paired line-height using the `--line-height` sub-key:

```css
@theme {
  --text-xs:    0.75rem;   /* --text-xs--line-height defaults to Tailwind's value */
  --text-sm:    0.875rem;
  --text-base:  1rem;      --text-base--line-height:   1.6;
  --text-lg:    1.125rem;  --text-lg--line-height:     1.5;
  --text-xl:    1.25rem;
  --text-2xl:   1.5rem;
  --text-3xl:   1.875rem;
  --text-4xl:   2.25rem;
  --text-5xl:   3rem;      --text-5xl--line-height:    1.1;
  --text-6xl:   3.75rem;
  --text-7xl:   4.5rem;

  /* Semantic scale names from DESIGN.md (preferred) */
  --text-h1:       3rem;      --text-h1--line-height:      1.1;
  --text-h2:       2.25rem;   --text-h2--line-height:      1.15;
  --text-h3:       1.875rem;  --text-h3--line-height:      1.25;
  --text-body-lg:  1.125rem;  --text-body-lg--line-height: 1.6;
  --text-body-md:  1rem;      --text-body-md--line-height: 1.6;
  --text-body-sm:  0.875rem;  --text-body-sm--line-height: 1.5;
  --text-label:    0.875rem;  --text-label--line-height:   1;
  --text-caption:  0.75rem;   --text-caption--line-height: 1.4;
  --text-overline: 0.75rem;   --text-overline--line-height:1;
}
```

Generated utilities: `text-h1`, `text-body-md`, `text-caption`, etc.

**DESIGN.md → CSS size conversion:**
- `48px` → `3rem` (divide by 16)
- `3rem` → use as-is
- `36px` → `2.25rem`
- `24px` → `1.5rem`
- `20px` → `1.25rem`
- `16px` → `1rem`
- `14px` → `0.875rem`
- `12px` → `0.75rem`

---

### Font Weight  `--font-weight-{name}`

```css
@theme {
  --font-weight-thin:       100;
  --font-weight-extralight: 200;
  --font-weight-light:      300;
  --font-weight-normal:     400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;
  --font-weight-extrabold:  800;
  --font-weight-black:      900;
}
```

Generated utilities: `font-thin`, `font-medium`, `font-bold`, etc.

Map numeric DESIGN.md weights to the nearest semantic name. Emit only the weights
that actually appear in the DESIGN.md typography section.

---

### Letter Spacing  `--tracking-{name}`

```css
@theme {
  --tracking-tighter:  -0.05em;
  --tracking-tight:    -0.025em;
  --tracking-normal:   0em;
  --tracking-wide:     0.025em;
  --tracking-wider:    0.05em;
  --tracking-widest:   0.1em;

  /* Semantic */
  --tracking-headline: -0.02em;
  --tracking-label:     0.1em;
  --tracking-caption:   0.04em;
}
```

Generated utilities: `tracking-tighter`, `tracking-headline`, etc.

---

### Line Height  `--leading-{name}`

Use `--text-{scale}--line-height` when pairing with a text size token (preferred).
Use `--leading-{name}` for standalone line-height utilities:

```css
@theme {
  --leading-none:    1;
  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
  --leading-loose:   2;
}
```

---

### Spacing  `--spacing-{scale}`

```css
@theme {
  /* Option A: explicit named values */
  --spacing-xs:  0.25rem;  /* 4px  */
  --spacing-sm:  0.5rem;   /* 8px  */
  --spacing-md:  1rem;     /* 16px */
  --spacing-lg:  1.5rem;   /* 24px */
  --spacing-xl:  2rem;     /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */

  /* Option B: numeric scale (mirrors Tailwind defaults) */
  --spacing: 0.25rem;      /* base unit — generates 1=0.25rem, 2=0.5rem … */
}
```

**Important:** Use Option A (explicit) when the DESIGN.md defines named scale levels
(xs/sm/md/lg/xl). Use Option B (multiplier) only when the design uses a pure 4px/8px grid
with no semantic names. Never mix both in the same file.

Generated utilities: `p-sm`, `m-md`, `gap-xl`, `w-2xl`, `h-3xl`, etc. (for Option A).

---

### Border Radius  `--radius-{scale}`

```css
@theme {
  --radius-none:  0px;
  --radius-xs:    2px;
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
  --radius-2xl:   24px;
  --radius-3xl:   32px;
  --radius-full:  9999px;
}
```

Generated utilities: `rounded-sm`, `rounded-md`, `rounded-full`, etc.

---

### Shadows  `--shadow-{scale}`

```css
@theme {
  --shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
  --shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --shadow-none: 0 0 #0000;
}
```

Generated utilities: `shadow-sm`, `shadow-md`, etc.

When the DESIGN.md describes shadows in prose (e.g. "soft 3-level elevation system"),
synthesize appropriate CSS box-shadow values that match the described intent.

---

### Breakpoints  `--breakpoint-{name}`

```css
@theme {
  --breakpoint-sm:  640px;
  --breakpoint-md:  768px;
  --breakpoint-lg:  1024px;
  --breakpoint-xl:  1280px;
  --breakpoint-2xl: 1536px;
}
```

Generated variants: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.

Only emit breakpoints that differ from Tailwind's defaults, or when the DESIGN.md
explicitly defines a breakpoint scale.

---

### Animations  `--animate-{name}`

```css
@theme {
  --animate-fade-in: fade-in 200ms ease-out;
  --animate-slide-up: slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slide-up {
    from { transform: translateY(8px); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
}
```

Generated utilities: `animate-fade-in`, `animate-slide-up`.

---

### Container  `--container-{name}` (max-widths)

```css
@theme {
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1280px;
  --container-prose: 65ch;
}
```

Generated utilities: `max-w-sm`, `max-w-lg`, `max-w-prose`, etc.

**⚠️ CRITICAL: ALL `--container-*` tokens collide with breakpoint names**

Tailwind v4 reserves `xs/sm/md/lg/xl/2xl` as **responsive breakpoints**.
Any `--container-*` token in `@theme` — regardless of its value — will NOT generate
a working `max-w-*` utility. `max-w-md` always falls back to `--spacing-md` (16px).

**What happens without the fix:**
```css
/* Your @theme defines: */
--container-md: 768px;
--spacing-md: 1rem;    /* 16px */

/* Tailwind generates: */
.max-w-md { max-width: var(--spacing-md); }  /* 16px! NOT 768px! */
```

`max-w-md` falls back to `--spacing-md` (16px) because `--container-md` is consumed
by the breakpoint system. Your text collapses to 16px wide.

**⚠️ MANDATORY FIX — add `@utility` overrides at the END of your CSS file
   whenever @theme defines ANY `--container-*` token:**

```css
/* Must be AFTER @theme and @layer blocks — ALL overrides required */
@utility max-w-xs {
    max-width: var(--container-xs) !important;
}
@utility max-w-sm {
    max-width: var(--container-sm) !important;
}
@utility max-w-md {
    max-width: var(--container-md) !important;
}
@utility max-w-lg {
    max-width: var(--container-lg) !important;
}
@utility max-w-xl {
    max-width: var(--container-xl) !important;
}
@utility max-w-2xl {
    max-width: var(--container-2xl) !important;
}
```

The `!important` is required because Tailwind generates its default `max-w-*` rules
after `@utility` blocks, overwriting them. The `!important` ensures your container
values win the cascade.

**Alternative:** Use non-conflicting names like `--container-content-md` and
`max-w-content-md`, or use inline values like `max-w-[768px]`.

---

## Variables NOT in @theme

Use plain `:root {}` for:
- Semantic alias variables bridging light/dark (when using `@theme inline`)
- Internal computed values not meant as utilities
- Z-index scale
- Transition durations (unless animations)

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-toast: 300;
  --duration-fast: 100ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
