---
figma-file-key: abc123def456
---
# Project Vision & Constitution

> **AGENT INSTRUCTION:** Read this file before every iteration. It serves as the project's "Long-Term Memory." If `next-prompt.md` is empty, pick the highest priority item from Section 5 OR invent a new component that fits the project vision.

## 1. Core Identity
* **Project Name:** Nebula Analytics
* **Figma File Key:** `abc123def456`
* **Figma URL:** `https://www.figma.com/design/abc123def456/Nebula-Analytics`
* **Mission:** A modern SaaS analytics dashboard for data-driven teams.
* **Target Audience:** Data analysts, product managers, engineering teams.
* **Voice:** Professional, modern, data-driven, and approachable.

## 2. Visual Language (Figma Prompt Strategy)
*Strictly adhere to these descriptive rules when extracting from Figma. Do NOT use code.*

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
* **Asset Flow:** Figma assets download to `.figma/assets/{component}/` → Validate → Copy production assets to `site/public/assets/{component}/`.
* **Navigation Strategy:**
    * **Global Header:** Logo, Dashboard, Reports, Settings.
    * **Global Sidebar:** Navigation links, user profile.

## 4. Component Map (Current State)
*The Agent MUST update this section when a new component is successfully built.*

* [x] `hero-section` (nodeId: `12:345`) - Hero with headline and CTA
* [x] `nav-bar` (nodeId: `67:890`) - Navigation bar
* [ ] `pricing-cards` (nodeId: `23:456`) - Pricing tier cards
* [ ] `feature-grid` (nodeId: `34:567`) - Feature highlights grid

## 5. The Roadmap (Backlog)
*If `next-prompt.md` is empty or completed, pick the next task from here.*

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

- [ ] `stats-overview` (nodeId: `45:678`) - Key metrics overview cards
- [ ] `chart-gallery` (nodeId: `56:789`) - Interactive chart components
- [ ] `team-section` (nodeId: `78:901`) - Team member profiles

## 7. Rules of Engagement
1. Do not recreate components in Section 4.
2. Always update `next-prompt.md` before completing.
3. Consume ideas from Section 6 when you use them.
4. Keep the loop moving.
