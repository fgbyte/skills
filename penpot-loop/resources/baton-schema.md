# Baton File Schema

The baton file (`.penpot/next-prompt.md`) is the communication mechanism between loop iterations. It tells the next agent what component to build.

## Format

```yaml
---
component: <component-name>
shapeId: <penpot-uuid>
page: <penpot-page-name>
---
<prompt-content>
```

## Fields

### Frontmatter (YAML)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `component` | string | Yes | Component name (kebab-case, used for filenames) |
| `shapeId` | string | Yes | Penpot shape UUID (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`, e.g., `0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345`) |
| `page` | string | Yes | Human-readable Penpot page name for context |

### Body (Markdown)

The body contains the full component prompt, which must include:

1. **One-line description** with vibe/atmosphere keywords
2. **Design System block** (required) — copied from `.penpot/DESIGN.md` Section 6
3. **Component Spec** — numbered list of sub-elements and their behavior

> **Figma ID format is `digits:digits` (e.g., `12:345`). If you see that pattern, you're using the wrong tool — Penpot IDs are always UUIDs.**

## Example

```markdown
---
component: hero-section
shapeId: "0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345"
page: "Landing Page"
---
A bold, modern hero section with a gradient background and CTA button.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark, minimal, data-focused
- Background: Deep charcoal/near-black (#0f1419)
- Primary Accent: Teal/Cyan (#2dd4bf)
- Text Primary: White (#ffffff)
- Font: Clean sans-serif (Inter, SF Pro, or system default)
- Layout: Centered content, max-width container

**Component Spec:**
1. Background image with gradient overlay
2. Headline text with accent color
3. Subheadline and CTA button
4. Responsive behavior for mobile
```

## Validation Rules

Before completing an iteration, validate your baton:

- [ ] `component` frontmatter field exists and is a valid filename (kebab-case)
- [ ] `shapeId` frontmatter field exists and matches the Penpot UUID regex `^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$` (case-insensitive)
- [ ] `shapeId` does NOT match Figma's `digits:digits` format (e.g., `12:345`) — that's the wrong tool
- [ ] `page` frontmatter field exists and matches a page in the focused Penpot file
- [ ] Prompt includes the design system block from `.penpot/DESIGN.md`
- [ ] Prompt describes a component NOT already in `.penpot/PROJECT.md` component map
- [ ] Prompt includes specific component spec details (numbered sub-elements)
- [ ] `shapeId` resolves to an existing shape in the file (verify with `penpotUtils.findShapeById`)
