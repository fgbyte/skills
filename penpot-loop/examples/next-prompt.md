<!--
  Example baton file for the penpot-loop skill.
  This file demonstrates the YAML frontmatter format and prompt body
  used to relay work between iterations. The shapeId below is a
  PLACEHOLDER UUID — replace it with the real Penpot shape UUID from
  your file before running the loop. Never use Figma's digits:digits
  format (e.g. "12:345") here; Penpot uses UUIDs.
-->
---
component: hero-section
shapeId: "0c4b6e9c-8e3a-4d4f-9b21-aa7bc12de345"
page: "Landing Page"
---

A bold, modern hero section with a gradient background and CTA button for a SaaS landing page.

**DESIGN SYSTEM (REQUIRED):**
- Platform: Web, Desktop-first
- Theme: Dark, minimal, data-focused
- Background: Deep charcoal/near-black (#0f1419)
- Surface: Slightly lighter charcoal (#1a1f2e) for cards
- Primary Accent: Teal/Cyan (#2dd4bf) for buttons and highlights
- Text Primary: White (#ffffff) for headlines
- Text Secondary: Soft gray (#a0a0a0) for body copy
- Font: Clean sans-serif (Inter, SF Pro, or system default)
- Buttons: Subtly rounded corners (8px), comfortable padding
- Cards: Gently rounded corners (12px), subtle shadows
- Layout: Centered content, max-width container, generous whitespace

**Component Spec:**
1. **Background:** Full-width gradient from deep charcoal to slightly lighter shade
2. **Headline:** Large, bold text "Build Faster" with white color
3. **Subheadline:** Smaller text describing the product value proposition
4. **CTA Button:** Teal button with "Get Started" text, rounded corners
5. **Responsive Behavior:** Stack elements vertically on mobile, maintain padding
