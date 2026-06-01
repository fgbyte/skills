# DESIGN.md Format Reference

Quick reference for parsing Google Stitch's DESIGN.md spec (alpha).
Full spec: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

---

## File Structure

```
--- ← YAML front matter start
name: <string>
version: alpha        # optional
description: <string> # optional

colors:
  <token-name>: "<hex>"  # must start with # in SRGB hex

typography:
  <scale-name>:
    fontFamily: <string>
    fontSize: <dimension>    # e.g. 48px, 3rem
    fontWeight: <number>     # 100–900
    lineHeight: <number|dim> # unitless (1.5) or dimension (24px)
    letterSpacing: <string>  # e.g. -0.02em, 0.1em

rounded:
  <scale>: <dimension>    # e.g. sm: 4px, md: 8px

spacing:
  <scale>: <dimension>    # e.g. sm: 8px, md: 16px

components:
  <component-name>:
    backgroundColor: "<hex>" | "{token.ref}"
    textColor: "<hex>" | "{token.ref}"
    rounded: "{rounded.sm}" | <dimension>
    padding: <dimension>
    typography: "{typography.body-md}"
    # variant: expressed as a sibling entry with key like "button-primary-hover"
--- ← YAML front matter end

## Overview
Prose description of design philosophy.

## Colors
Prose explanation of each color's semantic role.

## Typography
Prose explanation of the type system.

## Layout
Prose description of grid, spacing strategy.

## Components
Prose description of component patterns.

## Depth & Elevation      ← extended format (VoltAgent / TypeUI)
## Motion                 ← extended format
## Do's and Don'ts        ← extended format
## Responsive Behavior    ← extended format
```

---

## Token Reference Syntax

`{namespace.token-name}` references another token in the YAML.

Examples:
- `{colors.primary}` → value of `colors.primary`
- `{rounded.sm}` → value of `rounded.sm`
- `{typography.body-md}` → the full typography object at `body-md`

**Resolution rule:** Always resolve to the actual value before emitting `@theme`.
In `@layer components`, emit as `var(--css-equivalent)` for runtime theming.

Token reference → CSS variable mapping:
```
{colors.primary}     → var(--color-primary)
{colors.tertiary}    → var(--color-tertiary)
{rounded.sm}         → var(--radius-sm)
{spacing.md}         → var(--spacing-md)
{typography.body-md} → font: var(--text-body-md)/var(--text-body-md--line-height) var(--font-sans)
```

---

## Naming Conventions

### Color token names and their CSS equivalents

| DESIGN.md name | CSS variable | Role |
|---|---|---|
| `primary` | `--color-primary` | Main text / dominant UI color |
| `secondary` | `--color-secondary` | Supporting / metadata color |
| `tertiary` | `--color-tertiary` | Accent / CTA color |
| `neutral` | `--color-neutral` | Background / surface |
| `on-primary` | `--color-on-primary` | Text on primary backgrounds |
| `on-tertiary` | `--color-on-tertiary` | Text on tertiary (CTA) backgrounds |
| `surface` | `--color-surface` | Card / panel background |
| `surface-variant` | `--color-surface-variant` | Alternate surface |
| `error` | `--color-error` | Error states |
| `success` | `--color-success` | Success states |
| `warning` | `--color-warning` | Warning states |

### Typography scale names

Common naming patterns in DESIGN.md files:

**Semantic** (preferred): `h1`, `h2`, `h3`, `h4`, `h5`, `h6`,
`display`, `display-sm`, `body-lg`, `body-md`, `body-sm`,
`label`, `label-caps`, `caption`, `overline`, `code`

**Scale-based**: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`

**Mixed**: `headline-lg`, `headline-md`, `title-lg`, `body-md`, `label-sm`

Map whatever naming convention appears in the DESIGN.md to
CSS variable names following the same convention:
`body-md` → `--text-body-md`, `--text-body-md--line-height`

---

## Common Patterns in Stitch DESIGN.md Files

### 1. Minimal (2–3 colors, 2 type levels)
```yaml
colors:
  primary: "#1A1C1E"
  neutral: "#F7F5F2"
  accent:  "#B8422E"
typography:
  body: { fontFamily: Inter, fontSize: 16px, fontWeight: 400, lineHeight: 1.5 }
  heading: { fontFamily: Inter, fontSize: 32px, fontWeight: 700, lineHeight: 1.2 }
rounded:
  md: 8px
spacing:
  md: 16px
```

### 2. Full design system (8+ colors, 9–15 type levels)
Large DESIGN.md with named semantic colors, full type scale (display → caption),
multiple font families, elevation system, component definitions.

### 3. Extended VoltAgent format
Includes additional sections:
- `## Visual Theme & Atmosphere` — mood description
- `## Component Stylings` — detailed component patterns
- `## Depth & Elevation` — shadow system
- `## Motion` — animation principles
- `## Do's and Don'ts` — anti-patterns to avoid

All additional prose sections follow the same extraction rule:
extract any concrete token values mentioned and map them to CSS variables.

---

## What DESIGN.md Does NOT Cover

The following require assumptions or defaults when not specified:

- **Breakpoints** — default to Tailwind's standard breakpoints unless explicitly defined
- **Z-index scale** — emit as `:root` variables with sensible defaults (0, 100, 200, 300)
- **Focus ring styles** — infer from accent/tertiary color
- **Transition durations** — default to 150ms (fast), 200ms (base), 300ms (slow)
- **Font loading** — note which fonts need `@font-face` or a CDN import
