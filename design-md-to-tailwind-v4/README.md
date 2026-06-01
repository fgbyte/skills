# design-md-to-tailwind-v4

Skill to convert a `DESIGN.md` into a `globals.css` or `index.css` ready for Tailwind CSS v4, using `@theme` and a consistent structure for tokens, dark mode, and components.

It also includes an optional `shadcn/ui` compatibility mode, to emit the variable block that shadcn expects without sacrificing native Tailwind v4 tokens.

## Install

```bash
npx skills add fgbyte/skills --skill design-md-to-tailwind-v4
```

## What it solves

This repo documents a skill designed for workflows where design comes in `DESIGN.md` format:

- Google Stitch / Stitch-like specs
- Design tokens described in YAML front matter
- Hybrid systems with tokens + prose
- Themes with light/dark mode
- Projects needing `shadcn/ui` compatibility

The target output is a CSS stylesheet ready for Tailwind v4, with:

- `@theme` for tokens that should generate utilities
- `@theme inline` when semantic aliasing is needed at runtime
- `@layer base` for dark mode, resets, and compatibility
- `@layer components` for semantic classes derived from `components:`

## Repo structure

- [SKILL.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/SKILL.md): main skill definition and complete workflow
- [references/tailwind-v4-namespaces.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/references/tailwind-v4-namespaces.md): `@theme` namespaces table and generated utilities
- [references/design-md-spec.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/references/design-md-spec.md): `DESIGN.md` format guide
- [references/conversion-patterns.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/references/conversion-patterns.md): patterns and edge cases
- [examples/heritage.DESIGN.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/examples/heritage.DESIGN.md): input example
- [examples/heritage.globals.css](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/examples/heritage.globals.css): output example

## How to use the skill

Activate this skill when the user requests something like:

- "convert this `DESIGN.md` to Tailwind v4"
- "generate `globals.css` from this spec"
- "translate these design tokens to `@theme`"
- "I want `shadcn/ui` compatibility"

Accepted inputs:

- Text pasted in the conversation
- Uploaded file
- Path to a `DESIGN.md`

The skill must:

1. Read and resolve the YAML front matter
2. Use the prose as additional context
3. Map tokens to valid Tailwind v4 namespaces
4. Generate the CSS output in a fixed order
5. Add `shadcn` compatibility when requested

## Expected output flow

The output follows this order:

```css
@import "tailwindcss";
@import "tw-animate-css";       /* shadcn projects only */
@import "shadcn/tailwind.css";  /* shadcn projects only */

@custom-variant dark (&:is(.dark *));  /* optional but recommended */

/* 1. THEME */
@theme { ... }

/* 2. DARK MODE PRIMITIVES */
@theme inline { ... }
@layer base { ... }

/* 3. SHADCN COMPATIBILITY (optional) */
@layer base { ... }

/* 4. BASE RESETS */
@layer base { ... }

/* 5. COMPONENT TOKENS */
@layer components { ... }

/* 6. MAX-W OVERRIDES (ALWAYS REQUIRED when @theme defines --container-*) */
@utility max-w-xs { max-width: var(--container-xs) !important; }
@utility max-w-sm { max-width: var(--container-sm) !important; }
@utility max-w-md { max-width: var(--container-md) !important; }
@utility max-w-lg { max-width: var(--container-lg) !important; }
@utility max-w-xl { max-width: var(--container-xl) !important; }
@utility max-w-2xl { max-width: var(--container-2xl) !important; }
```

## shadcn/ui compatibility

The skill already supports a `shadcn mode`.

It activates when the user:

- mentions `shadcn`
- mentions `shadcn/ui`
- requests compatibility with its variables
- says the output should work in a shadcn-based project

It can also be activated via project autodetection.

Strong signals:

- `components.json` exists
- `components/ui` exists
- A `globals.css` or similar stylesheet already exists with variables like `--background`, `--foreground`, `--primary`, `--ring`, or `--radius`

Weak signals:

- Dependencies like `class-variance-authority`, `tailwind-merge`, `clsx`, `lucide-react`, or `@radix-ui/*`

Rule:

- 1 strong signal activates `shadcn mode`
- 2 or more weak signals also activate it
- 1 weak signal alone is not enough

When this mode is active, the skill:

- Emits three imports in exact order: `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`
- First generates the normal Tailwind v4 tokens
- Preserves names like `--color-primary`, `--color-surface`, `--radius-md`
- Then adds an alias layer for variables like:
  - `--background`
  - `--foreground`
  - `--primary`
  - `--primary-foreground`
  - `--secondary`
  - `--muted`
  - `--accent`
  - `--destructive`
  - `--border`
  - `--input`
  - `--ring`
  - `--radius`

This avoids renaming the entire token system just to fit shadcn.

Conceptual example:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme { ... }

@layer base {
  :root {
    --background: var(--color-neutral);
    --foreground: var(--color-primary);
    --primary: var(--color-tertiary);
    --primary-foreground: var(--color-on-tertiary, #ffffff);
    --border: var(--color-border);
    --ring: var(--color-tertiary, var(--color-primary));
    --radius: var(--radius-md);
  }
}
```

## Important rule

shadcn compatibility is additive.

This means:

- Yes, aliases that shadcn understands are added
- No, Tailwind v4 base tokens are not replaced
- No, the full `@theme` is not renamed to the shadcn scheme

This way the output remains reusable outside of shadcn.

## Key references

Check these two first when extending the skill:

- [SKILL.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/SKILL.md)
- [references/conversion-patterns.md](C:/Users/Admin/Desktop/design-md-to-tailwind-v4/references/conversion-patterns.md)

There you will find:

- The official workflow
- Mapping rules
- Dark mode patterns
- Fallback rules
- The `shadcn/ui` compatibility pattern

## Current status

Currently the repo documents the skill and its references. It does not include an executable or automatic pipeline within the repo; its goal is to serve as the source of truth for Codex to correctly apply this conversion during a task.
