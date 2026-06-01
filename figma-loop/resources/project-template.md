# Project Template

Use these templates when setting up a new project for the figma-loop build loop.

## PROJECT.md Template

```markdown
---
figma-file-key: <your-figma-file-key>
---
# Project Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It serves as the project's "Long-Term Memory."

## 1. Core Identity
* **Project Name:** [Your project name]
* **Figma File Key:** [Your Figma file key from the URL]
* **Figma URL:** [Full Figma file URL]
* **Mission:** [What the site achieves]
* **Target Audience:** [Who uses this site]
* **Voice:** [Tone and personality descriptors]

## 2. Visual Language
*Reference these descriptors when extracting from Figma.*

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
* **Asset Flow:** Figma assets download to `.figma/assets/{component}/` → Validate → Copy production assets to `site/public/assets/{component}/`
* **Navigation Strategy:** [How nav works]

## 4. Component Map (Current State)
*Update this when a new component is successfully built.*

* [x] `hero-section` (nodeId: `12:345`) - Hero with headline and CTA
* [ ] `nav-bar` (nodeId: `67:890`) - Navigation bar

## 5. The Roadmap (Backlog)
*Pick the next task from here if available.*

### High Priority
- [ ] [Component name] (nodeId: `xx:xxx`) - [Description]
- [ ] [Component name] (nodeId: `xx:xxx`) - [Description]

### Medium Priority
- [ ] [Component name] (nodeId: `xx:xxx`) - [Description]

## 6. Creative Freedom Guidelines
*When the backlog is empty, follow these guidelines to innovate.*

1. **Stay On-Brand:** New components must fit the established vibe
2. **Enhance the Core:** Support the site mission
3. **Naming Convention:** Use kebab-case, descriptive component names

### Ideas to Explore
*Pick one, build it, then REMOVE it from this list.*

- [ ] [Component name] (nodeId: `xx:xxx`) - [Description]
- [ ] [Component name] (nodeId: `xx:xxx`) - [Description]

## 7. Rules of Engagement
1. Do not recreate components in Section 4
2. Always update `next-prompt.md` before completing
3. Consume ideas from Section 6 when you use them
4. Keep the loop moving
```

## DESIGN.md Template

Generate this by extracting design tokens from Figma, or create manually:

```markdown
# Design System: [Project Name]
**Figma File Key:** [Your Figma file key]

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
