# Baton File Schema

The baton file (`next-prompt.md`) is the communication mechanism between loop iterations. It tells the next agent what component to build.

## Format

```yaml
---
component: <component-name>
nodeId: <figma-node-id>
page: <figma-page-name>
---
<prompt-content>
```

## Fields

### Frontmatter (YAML)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `component` | string | Yes | Component name (kebab-case, used for filenames) |
| `nodeId` | string | Yes | Figma node ID (format: `digits:digits`, e.g., `12:345`) |
| `page` | string | Yes | Human-readable Figma page name for context |

### Body (Markdown)

The body contains the full component prompt, which must include:

1. **One-line description** with vibe/atmosphere keywords
2. **Design System block** (required) — copied from `.figma/DESIGN.md` Section 6
3. **Component Spec** — numbered list of sub-elements and their behavior

## Example

```markdown
---
component: hero-section
nodeId: "12:345"
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
- [ ] `nodeId` frontmatter field exists and matches Figma format (`digits:digits`)
- [ ] `page` frontmatter field exists and matches a page in the Figma file
- [ ] Prompt includes the design system block
- [ ] Prompt describes a component NOT already in `PROJECT.md` component map
- [ ] Prompt includes specific component spec details
