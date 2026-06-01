---
penpot-file-id: 0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345
---
# Project Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It serves as the project's "Long-Term Memory." If `.penpot/next-prompt.md` is empty, pick the highest priority item from Section 5 OR invent a new component that fits the project vision.

## 1. Core Identity
* **Project Name:** Nebula Analytics
* **Penpot File UUID:** `0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345`
* **Penpot URL:** `https://design.penpot.app/#/workspace?file-id=0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345`
* **Mission:** A modern SaaS analytics dashboard for data-driven teams.
* **Target Audience:** Data analysts, product managers, engineering teams.
* **Voice:** Professional, modern, data-driven, and approachable.

## 2. Visual Language (Penpot Prompt Strategy)
*Strictly adhere to these descriptive rules when extracting from Penpot. Do NOT use `penpot.generateStyle()` or `penpot.generateMarkup()` — write code from tokens.*

* **The "Vibe" (Adjectives):**
    * *Primary:* **Modern** (Clean, sleek, contemporary design).
    * *Secondary:* **Data-Driven** (Charts, metrics, visualizations).
    * *Tertiary:* **Professional** (Trustworthy, enterprise-ready).

* **Color Philosophy (Semantic):**
    * **Backgrounds:** Deep charcoal (#0f1419). Dark, focused canvas.
    * **Accents:** Teal/Cyan (#2dd4bf) for CTAs and highlights.
    * **Text:** White (#ffffff) for headlines, soft gray (#a0a0a0) for body.

## 3. Architecture & File Structure
* **Root:** `site/public/`
* **Asset Flow:** Penpot assets download via the `export_shape` MCP tool (use `format: "svg"` for vectors, `format: "png"` for raster, `mode: "fill"` for raw image bytes) to `.penpot/assets/{component}/` → Validate → Copy production assets to `site/public/assets/{component}/`. When filesystem access is disabled, the tool returns base64; decode with `node .penpot/scripts/save_base64_asset.js "<base64>" .penpot/assets/{component}/{name}.png`.
* **Tree Walking:** Use `penpotUtils` (helpers like `shapeStructure`, `findShapeById`, `findShapes`, `analyzeDescendants`, `getPageByName`) inside `execute_code` to walk shape subtrees — never hand-roll tree traversal.
* **Navigation Strategy:**
    * **MCP Plugin Connectivity:** The Penpot MCP plugin UI must stay open and connected (WebSocket on port 4402) throughout the loop. The plugin operates on the currently focused page.
    * **Global Header:** Logo, Dashboard, Reports, Settings.
    * **Global Sidebar:** Navigation links, user profile.

## 4. Component Map (Current State)
*The Agent MUST update this section when a new component is successfully built.*

* [x] `hero-section` (shapeId: `0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345`) - Hero with headline and CTA
* [x] `nav-bar` (shapeId: `a1b2c3d4-5678-90ab-cdef-1234567890ab`) - Navigation bar
* [ ] `pricing-cards` (shapeId: `b2c3d4e5-6789-01bc-def2-2345678901bc`) - Pricing tier cards
* [ ] `feature-grid` (shapeId: `c3d4e5f6-7890-12cd-ef34-3456789012cd`) - Feature highlights grid

## 5. The Roadmap (Backlog)
*If `.penpot/next-prompt.md` is empty or completed, pick the next task from here.*

### High Priority
- [ ] **Pricing Cards:** Three-tier pricing with feature lists.
- [ ] **Feature Grid:** Grid of feature highlights with icons.

### Medium Priority
- [ ] **Testimonials:** Customer quotes and avatars.
- [ ] **Footer:** Links, social icons, copyright.

## 6. Creative Freedom Guidelines
*When the backlog is empty, follow these guidelines to innovate.*

1. **Stay On-Brand:** New components must fit the "Modern + Data-Driven + Professional" vibe.
2. **Enhance the Core:** Support the analytics dashboard experience.
3. **Naming Convention:** Use kebab-case, descriptive component names.

### Ideas to Explore
*Pick one, build it, then REMOVE it from this list.*

- [ ] `stats-overview` (shapeId: `d4e5f6a7-8901-23de-f456-4567890123de`) - Key metrics overview cards
- [ ] `chart-gallery` (shapeId: `e5f6a7b8-9012-34ef-5678-5678901234ef`) - Interactive chart components
- [ ] `team-section` (shapeId: `f6a7b8c9-0123-45f0-6789-6789012345f0`) - Team member profiles

## 7. Rules of Engagement
1. Do not recreate components in Section 4.
2. Always update `.penpot/next-prompt.md` before completing.
3. Consume ideas from Section 6 when you use them.
4. Keep the loop moving.
5. Never use Figma's `digits:digits` ID format — only Penpot UUIDs.
