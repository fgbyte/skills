# Conversion Patterns & Edge Cases

---

## Pattern 1 — Full @theme block structure

Always use this exact scaffold:

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════════════════
   1. THEME TOKENS
   Auto-generates Tailwind utilities from every variable here.
   ═══════════════════════════════════════════════════════════ */
@theme {

  /* ── Colors ──────────────────────────────────────────── */
  --color-primary:   #1A1C1E;
  --color-secondary: #6C7278;
  --color-tertiary:  #B8422E;
  --color-neutral:   #F7F5F2;

  /* ── Font Families ───────────────────────────────────── */
  --font-sans:    "Public Sans", system-ui, sans-serif;
  --font-display: "Space Grotesk", system-ui, sans-serif;

  /* ── Type Scale ──────────────────────────────────────── */
  --text-h1:       3rem;    --text-h1--line-height:      1.1;
  --text-h2:       2.25rem; --text-h2--line-height:      1.15;
  --text-h3:       1.875rem;--text-h3--line-height:      1.25;
  --text-body-lg:  1.125rem;--text-body-lg--line-height: 1.6;
  --text-body-md:  1rem;    --text-body-md--line-height: 1.6;
  --text-body-sm:  0.875rem;--text-body-sm--line-height: 1.5;
  --text-label:    0.875rem;--text-label--line-height:   1;
  --text-caption:  0.75rem; --text-caption--line-height: 1.4;

  /* ── Font Weights ────────────────────────────────────── */
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* ── Letter Spacing ──────────────────────────────────── */
  --tracking-tight:    -0.02em;
  --tracking-normal:    0em;
  --tracking-wide:      0.025em;
  --tracking-label:     0.1em;

  /* ── Spacing ─────────────────────────────────────────── */
  --spacing-xs:  0.25rem;
  --spacing-sm:  0.5rem;
  --spacing-md:  1rem;
  --spacing-lg:  1.5rem;
  --spacing-xl:  2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* ── Border Radius ───────────────────────────────────── */
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* ── Shadows ─────────────────────────────────────────── */
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
}
```

---

## Pattern 2 — Dark mode with semantic aliases

Use this when the DESIGN.md defines 4+ light/dark color pairs.

```css
@import "tailwindcss";

/* ── STEP 1: Define semantic aliases in @theme inline ──── */
@theme inline {
  --color-bg:      var(--bg);
  --color-fg:      var(--fg);
  --color-surface: var(--surface);
  --color-border:  var(--border);
}

/* ── STEP 2: Define primitives and dark overrides ──────── */
@layer base {
  :root {
    --bg:      #F7F5F2;
    --fg:      #1A1C1E;
    --surface: #FFFFFF;
    --border:  #E5E3DF;
  }
  .dark,
  [data-theme="dark"] {
    --bg:      #1A1C1E;
    --fg:      #F7F5F2;
    --surface: #2A2C2E;
    --border:  #3A3C3E;
  }
}

/* ── STEP 3: Static color tokens still go in @theme ────── */
@theme {
  --color-primary:  #1A1C1E;
  --color-tertiary: #B8422E;  /* accent doesn't change in dark mode */
  /* ... rest of tokens ... */
}
```

---

## Pattern 3 — Component tokens from DESIGN.md `components:` section

Given this DESIGN.md:
```yaml
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
```

Emit:
```css
@layer components {
  .btn-primary {
    background-color: var(--color-tertiary);
    color: var(--color-on-tertiary, #fff);
    border-radius: var(--radius-sm);
    padding-block: 0.75rem;
    padding-inline: 1.25rem;
    font-weight: var(--font-weight-medium, 500);
    transition: background-color 150ms ease, color 150ms ease;
    cursor: pointer;
  }
  .btn-primary:hover,
  .btn-primary:focus-visible {
    background-color: var(--color-tertiary-container,
      color-mix(in oklab, var(--color-tertiary) 85%, black));
  }
  .btn-primary:focus-visible {
    outline: 2px solid var(--color-tertiary);
    outline-offset: 2px;
  }
}
```

**Naming rule for component classes:**
- DESIGN.md `button-primary` → CSS `.btn-primary` (abbreviated prefix)
- DESIGN.md `card` → CSS `.card`
- DESIGN.md `nav-item` → CSS `.nav-item`
- DESIGN.md `input-field` → CSS `.input`
- Hover/active/pressed variants → CSS pseudo-classes on the same selector

---

## Pattern 4 — Resetting default Tailwind theme

When the DESIGN.md is a complete, custom design system and Tailwind's default
colors/spacing would pollute the class set, reset with `--*: initial`:

```css
@import "tailwindcss";

@theme {
  --*: initial;  /* removes ALL default theme variables */

  /* Now define the complete custom theme from DESIGN.md */
  --color-primary: #1A1C1E;
  /* ... */
}
```

**When to use reset:**
- DESIGN.md has a complete color palette with no semantic overlap with Tailwind defaults
- Project uses only semantic class names, not numeric scales
- DESIGN.md explicitly states "custom design system" or "brand-exclusive"

**When NOT to use reset:**
- DESIGN.md extends Tailwind defaults (adds brand colors but keeps grays, etc.)
- Project uses standard Tailwind utilities alongside custom tokens

---

## Pattern 5 — Font loading annotation

When the DESIGN.md specifies non-system fonts, add a comment block at the top:

```css
/*
  FONT LOADING REQUIRED
  ─────────────────────
  This theme uses the following custom fonts. Add ONE of these
  to your HTML <head> before this stylesheet:

  Option A — Google Fonts CDN:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">

  Option B — Self-hosted @font-face:
  Add @font-face rules before @import "tailwindcss";
*/
```

---

## Pattern 6 — Animations from prose descriptions

When the DESIGN.md `## Motion` section describes animations in prose:

> "Elements enter with a subtle upward drift and fade. Interactive elements respond immediately (100ms) with a spring-like bounce."

Synthesize appropriate tokens:

```css
@theme {
  --animate-enter:  enter 250ms cubic-bezier(0.16, 1, 0.3, 1);
  --animate-exit:   exit  150ms ease-in;

  @keyframes enter {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes exit {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-4px); }
  }
}

:root {
  --duration-instant: 100ms;
  --duration-fast:    150ms;
  --duration-base:    250ms;
  --ease-spring:      cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Pattern 7 — Handling `label-caps` typography

A common DESIGN.md pattern is `label-caps`: small text with uppercase + wide tracking.
This requires no special CSS variable — use `@layer components`:

```css
@theme {
  --text-label: 0.75rem;   --text-label--line-height: 1;
  --tracking-label: 0.1em;
  --font-weight-label: 500;
}

@layer components {
  .label-caps {
    font-size: var(--text-label);
    line-height: var(--text-label--line-height);
    letter-spacing: var(--tracking-label);
    font-weight: var(--font-weight-label);
    text-transform: uppercase;
    font-family: var(--font-display, var(--font-sans));
  }
}
```

---

## Pattern 8 — shadcn/ui compatibility layer

When shadcn is detected, the complete output looks like this.
The `@theme` block is unchanged — this pattern only adds layers on top.

```css
/* ✅ CORRECT — all three imports, in this exact order */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

/* ── Dark mode custom variant (optional but recommended) ── */
@custom-variant dark (&:is(.dark *));

/* ❌ WRONG — missing tw-animate-css */
@import "tailwindcss";
@import "shadcn/tailwind.css";

/* ❌ WRONG — missing shadcn import, components unstyled */
@import "tailwindcss";
@import "tw-animate-css";

/* ❌ WRONG — wrong order */
@import "tw-animate-css";
@import "tailwindcss";
@import "shadcn/tailwind.css";
```

/* ═══ 1. THEME — unchanged, generates Tailwind utilities ════ */
@theme {
  --color-primary:            #1A1C1E;
  --color-secondary:          #6C7278;
  --color-tertiary:           #B8422E;
  --color-tertiary-container: #F2D8D4;
  --color-neutral:            #F7F5F2;
  --color-surface:            #FFFFFF;
  --color-border:             #E5E3DF;
  --color-on-tertiary:        #FFFFFF;
  --font-sans:    "Public Sans", system-ui, sans-serif;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
  /* ... rest of @theme tokens ... */
}

/* ═══ 2. SHADCN/UI COMPATIBILITY LAYER ══════════════════════
   shadcn reads these exact variable names from :root.
   They alias @theme tokens — no values are duplicated.
   ══════════════════════════════════════════════════════════ */
@layer base {
  :root {
    /* Core */
    --background:           var(--color-neutral);
    --foreground:           var(--color-primary);

    /* Card */
    --card:                 var(--color-surface);
    --card-foreground:      var(--color-primary);

    /* Popover */
    --popover:              var(--color-surface);
    --popover-foreground:   var(--color-primary);

    /* Primary = CTA/action color (DESIGN.md tertiary, NOT primary) */
    --primary:              var(--color-tertiary);
    --primary-foreground:   var(--color-on-tertiary, #fff);

    /* Secondary */
    --secondary:            var(--color-surface);
    --secondary-foreground: var(--color-primary);

    /* Muted */
    --muted:                var(--color-neutral);
    --muted-foreground:     var(--color-secondary);

    /* Accent */
    --accent:               var(--color-tertiary-container, var(--color-neutral));
    --accent-foreground:    var(--color-primary);

    /* Destructive — use error token if present, otherwise synthesize */
    --destructive:          var(--color-error, #dc2626); /* synthesized if no color-error in DESIGN.md */
    --destructive-foreground: #fff;

    /* Border / Input / Ring */
    --border:               var(--color-border);
    --input:                var(--color-border);
    --ring:                 var(--color-tertiary);

    /* Radius — shadcn derives all component radii from this single value */
    --radius:               var(--radius-md, 0.5rem);
  }

  /* Dark mode overrides — only emit if DESIGN.md defines dark colors */
  .dark,
  [data-theme="dark"] {
    --background:         var(--color-primary);
    --foreground:         var(--color-neutral);
    --card:               color-mix(in oklab, var(--color-primary) 85%, white);
    --card-foreground:    var(--color-neutral);
    --popover:            color-mix(in oklab, var(--color-primary) 85%, white);
    --popover-foreground: var(--color-neutral);
    --muted:              color-mix(in oklab, var(--color-primary) 70%, white);
    --muted-foreground:   var(--color-secondary);
    --border:             color-mix(in oklab, var(--color-primary) 60%, white);
    --input:              color-mix(in oklab, var(--color-primary) 60%, white);
  }
}
```

**Token mapping rules:**

| shadcn variable | Source token | Critical rule |
|---|---|---|
| `--primary` | `colors.tertiary` | shadcn "primary" = action color, NOT brand color |
| `--background` | `colors.neutral` | Page background |
| `--foreground` | `colors.primary` | Default text |
| `--muted-foreground` | `colors.secondary` | Subdued/metadata text |
| `--border` + `--input` | `colors.border` | Dividers and form inputs |
| `--ring` | `colors.tertiary` | Focus rings match CTA |
| `--radius` | `rounded.md` | shadcn scales all radii from this single base |
| `--destructive` | `colors.error` (or `#dc2626`) | Always needs a value; synthesize if absent |

---

## Edge Case — DESIGN.md with only prose (no YAML front matter)

Some DESIGN.md files (especially hand-written ones) skip the YAML front matter
and only have markdown sections. Extract tokens by:

1. Scanning for hex codes (`#[0-9A-Fa-f]{3,8}`) → color tokens
2. Scanning for `px`, `rem`, `em` size values near font-related words → type scale
3. Scanning for spacing-related values near layout words → spacing tokens
4. Scanning for `border-radius` mentions → radius tokens

Label these as "(inferred)" in a comment when the token value was not explicit in YAML.

---

## Edge Case — Missing `on-*` colors

When the DESIGN.md defines `tertiary: "#B8422E"` but not `on-tertiary`, synthesize:

```css
@theme {
  --color-tertiary:    #B8422E;
  --color-on-tertiary: #ffffff; /* synthesized: light text on dark accent */
}
```

Rule: if the accent color has luminance < 0.35 (dark), `on-*` = white.
If luminance > 0.65 (light), `on-*` = `--color-primary` (dark text).
For mid-range luminance, default to white and add a comment.

---

## Edge Case — Spacing as 8px base grid

When DESIGN.md says "8px base unit" in prose but defines no explicit scale, generate:

```css
@theme {
  --spacing-0:  0px;
  --spacing-1:  0.25rem;  /* 4px  — half-step */
  --spacing-2:  0.5rem;   /* 8px  */
  --spacing-3:  0.75rem;  /* 12px */
  --spacing-4:  1rem;     /* 16px */
  --spacing-5:  1.25rem;  /* 20px */
  --spacing-6:  1.5rem;   /* 24px */
  --spacing-8:  2rem;     /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
}
```

---

## Edge Case — WCAG contrast annotation

When generating component tokens, optionally annotate WCAG contrast ratios
for critical color pairs:

```css
/* bg: #B8422E | text: #FFFFFF | contrast: 4.82:1 — passes WCAG AA (≥4.5:1) ✓ */
.btn-primary { background-color: var(--color-tertiary); color: #fff; }
```

Add a warning comment if a color pair fails WCAG AA (< 4.5:1 for normal text).

---

## Pattern 9 — Container max-width overrides (ALWAYS REQUIRED)

**⚠️ This is NOT an edge case — it is mandatory whenever @theme defines ANY `--container-*` token.**

Tailwind v4 reserves `xs/sm/md/lg/xl/2xl` as **responsive breakpoints**, not container
widths. If you define `--container-max: 576px` in `@theme`, Tailwind will NOT generate
a `max-w-md` utility from it. Instead, `max-w-md` falls back to `--spacing-md` (16px).
Your layout will collapse.

**Symptom:** Text using `max-w-md` renders at ~16px wide instead of 576px.

**The fix — emit `@utility` overrides for ALL responsive breakpoints:**

```css
/* ═══ max-w OVERRIDES — must be last, after all @theme/@layer blocks ═══
    ⚠️ MANDATORY when @theme defines any --container-* token.
    ALL overrides are required — not optional. ════════════════════════════ */
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
/* Add one block per custom container token (e.g. --container-max): */
@utility max-w-container {
    max-width: var(--container-max) !important;
}
```

**Why `!important` is required:** Tailwind generates its default `max-w-*` rules after
`@utility` blocks, overwriting them. The `!important` ensures your container values
win the cascade.

**Self-check:** After generating, verify in browser dev tools that `max-w-md` resolves
to `var(--container-md)` (or your custom token), NOT `var(--spacing-md)` (16px).
