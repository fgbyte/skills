---
name: Heritage
version: alpha

colors:
  primary:            "#1A1C1E"
  secondary:          "#6C7278"
  tertiary:           "#B8422E"
  tertiary-container: "#F2D8D4"
  neutral:            "#F7F5F2"
  surface:            "#FFFFFF"
  border:             "#E5E3DF"

typography:
  h1:
    fontFamily: Public Sans
    fontSize:   48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize:   36px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize:   28px
    fontWeight: 600
    lineHeight: 1.25
  body-lg:
    fontFamily: Public Sans
    fontSize:   18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Public Sans
    fontSize:   16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Public Sans
    fontSize:   14px
    fontWeight: 400
    lineHeight: 1.5
  label-caps:
    fontFamily: Space Grotesk
    fontSize:   12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.1em
  caption:
    fontFamily: Public Sans
    fontSize:   12px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  sm:   4px
  md:   8px
  lg:   12px
  full: 9999px

spacing:
  xs:  4px
  sm:  8px
  md:  16px
  lg:  24px
  xl:  32px
  2xl: 48px
  3xl: 64px

components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor:       "#FFFFFF"
    rounded:         "{rounded.sm}"
    padding:         "12px 20px"
    typography:      "{typography.label-caps}"
  button-primary-hover:
    backgroundColor: "{colors.tertiary-container}"
    textColor:       "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor:       "{colors.primary}"
    rounded:         "{rounded.sm}"
    padding:         "12px 20px"
    border:          "1px solid {colors.border}"
  card:
    backgroundColor: "{colors.surface}"
    rounded:         "{rounded.md}"
    padding:         "{spacing.lg}"
---

## Overview

Architectural Minimalism meets Journalistic Gravitas. The UI evokes a premium matte
finish — a high-end broadsheet or contemporary gallery. Every typographic and spatial
decision reinforces authority, restraint, and considered detail.

## Colors

The palette is rooted in high-contrast neutrals and a single warm accent color.

- **Primary (#1A1C1E):** Deep ink for headlines and core text.
- **Secondary (#6C7278):** Sophisticated slate for borders, captions, and metadata.
- **Tertiary (#B8422E):** "Boston Clay" — the sole driver for interaction. Used
  exclusively for CTAs, links, and active states.
- **Tertiary Container (#F2D8D4):** Muted rose for hover states and tinted backgrounds.
- **Neutral (#F7F5F2):** Warm limestone foundation, softer than pure white.
- **Surface (#FFFFFF):** Pure white for card and panel backgrounds.

Use color as sparingly as possible. Boston Clay appears only once per viewport.

## Typography

The typography strategy leverages two distinct weights of **Public Sans** for the
narrative voice and **Space Grotesk** for technical data and labels.

- **Headlines (h1–h3):** Public Sans Semi-Bold. Tight tracking establishes institutional
  authority.
- **Body (body-md, body-lg):** Public Sans Regular. Generous line-height for long-form
  readability.
- **Labels:** Space Grotesk Medium in all-caps with wide tracking. Used for timestamps,
  categories, and metadata only.
- **Captions:** Public Sans Regular at 12px for image credits and footnotes.

## Layout

The layout follows a Fixed-Max-Width Grid (max 1200px) with an 8px base spacing unit.
A strict spacing scale ensures consistent rhythm. Components are grouped using
"containment" — related items in cards with 24px internal padding.

## Depth & Elevation

Three elevation levels using progressively softer shadows:
- **Level 0:** Flat, no shadow. Used for inline content.
- **Level 1 (card):** `0 1px 3px rgb(0 0 0 / 0.10)` — for cards and dropdowns.
- **Level 2 (modal):** `0 8px 24px rgb(0 0 0 / 0.12)` — for modals and popovers.

## Motion

Minimal. Transitions only on interactive states (hover, focus). Duration: 150ms.
Easing: `ease`. No gratuitous animation — the design conveys stability.

## Do's and Don'ts

**Do:** Use Boston Clay (#B8422E) only for primary CTAs and links.
**Don't:** Use the accent color for decorative elements.
**Do:** Maintain the 8px spacing grid at all times.
**Don't:** Mix font families outside the two defined stacks.
**Do:** Use label-caps for all metadata and category tags.
