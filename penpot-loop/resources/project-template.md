# Project Template

Use these templates when setting up a new project for the penpot-loop build loop.

## PROJECT.md Template

```markdown
---
penpot-file-id: <your-penpot-file-uuid>
---
# Project Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It serves as the project's "Long-Term Memory."

## 1. Core Identity
* **Project Name:** [Your project name]
* **Penpot File UUID:** [Your Penpot file UUID from the URL]
* **Penpot URL:** [Full Penpot file URL]
* **Mission:** [What the site achieves]
* **Target Audience:** [Who uses this site]
* **Voice:** [Tone and personality descriptors]

## 2. Visual Language
*Reference these descriptors when extracting from Penpot.*

* **The "Vibe" (Adjectives):**
    * *Primary:* [Main aesthetic keyword]
    * *Secondary:* [Supporting aesthetic]
    * *Tertiary:* [Additional flavor]

* **Color Philosophy (Semantic):**
    * **Backgrounds:** [Description] (#hex)
    * **Accents:** [Description] (#hex)
    * **Text:** [Description] (#hex)

## 3. Architecture & File Structure
* **Root:** `site/public/`
* **Asset Flow:** Penpot assets export via `export_shape` (MCP, port 4401) to `.penpot/assets/{component}/` → Validate → Copy production assets to `site/public/assets/{component}/`. For inline base64 payloads, decode with `node .penpot/scripts/save_base64_asset.js "<base64>" <outputPath>`.
* **Navigation Strategy:** [How nav works]

## 4. Component Map (Current State)
*Update this when a new component is successfully built.*

* [x] `hero-section` (shapeId: `0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345`) - Hero with headline and CTA
* [ ] `nav-bar` (shapeId: `a1b2c3d4-5678-90ab-cdef-1234567890ab`) - Navigation bar

## 5. The Roadmap (Backlog)
*Pick the next task from here if available.*

### High Priority
- [ ] [Component name] (shapeId: `<uuid>`) - [Description]
- [ ] [Component name] (shapeId: `<uuid>`) - [Description]

### Medium Priority
- [ ] [Component name] (shapeId: `<uuid>`) - [Description]

## 6. Creative Freedom Guidelines
*When the backlog is empty, follow these guidelines to innovate.*

1. **Stay On-Brand:** New components must fit the established vibe
2. **Enhance the Core:** Support the site mission
3. **Naming Convention:** Use kebab-case, descriptive component names

### Ideas to Explore
*Pick one, build it, then REMOVE it from this list.*

- [ ] [Component name] (shapeId: `<uuid>`) - [Description]
- [ ] [Component name] (shapeId: `<uuid>`) - [Description]

## 7. Rules of Engagement
1. Do not recreate components in Section 4
2. Always update `next-prompt.md` before completing
3. Consume ideas from Section 6 when you use them
4. Keep the loop moving
5. Never use `penpot.generateStyle()` or `penpot.generateMarkup()` — write CSS/HTML by hand from extracted tokens
```

## DESIGN.md Template

Generate this by extracting design tokens from Penpot via `penpotUtils.shapeStructure()` and `penpotUtils.tokenOverview()`, or create manually:

```markdown
# Design System: [Project Name]
**Penpot File UUID:** [Your Penpot file UUID]

## 1. Visual Theme & Atmosphere
[Describe mood, density, aesthetic philosophy]

## 2. Color Palette & Roles
- **[Descriptive Name]** (#hexcode) – [Functional role]
- **[Descriptive Name]** (#hexcode) – [Functional role]

## 3. Typography Rules
[Font family, weights, sizes, spacing]

## 4. Component Stylings
* **Buttons:** [Shape, color, behavior]
* **Cards:** [Corners, background, shadows]
* **Inputs:** [Stroke, background, focus states]

## 5. Layout Principles
[Whitespace strategy, margins, grid alignment]

## 6. Design Tokens for Code Generation
**Copy this block into every baton prompt:**

**DESIGN SYSTEM (REQUIRED):**
- Platform: [Web/Mobile], [Desktop/Mobile]-first
- Theme: [Dark/Light], [descriptors]
- Background: [Description] (#hex)
- Primary Accent: [Description] (#hex)
- Text Primary: [Description] (#hex)
- Font: [Description]
- Layout: [Description]
```

## File Structure Reference

```
project/
├── .penpot/
│   ├── metadata.json      # Persist this — Penpot file metadata & component tracking
│   ├── DESIGN.md          # Visual design system (from first iteration)
│   ├── PROJECT.md         # Project vision, component map, roadmap
│   ├── next-prompt.md     # The baton — current task
│   ├── assets/{component}/  # Exported assets (via export_shape)
│   ├── screenshots/{component}.png  # Playwriter verification
│   └── scripts/save_base64_asset.js  # base64 → file decoder
└── site/public/           # Production site
    ├── index.html, components/{component}.html, ...
```
