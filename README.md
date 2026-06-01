# Zed Agent Skills

Collection of modular agent skills for the Zed editor, focused on design-to-code workflows.

## Skills

### [figma-loop](figma-loop/) — Figma Build Loop
Iteratively builds websites from Figma designs using an autonomous baton-passing loop pattern.

**Install:** `npx skills add fgbyte/skills --skill figma-loop`

### [penpot-loop](penpot-loop/) — Penpot Build Loop
Iteratively builds websites from Penpot designs using an autonomous baton-passing loop pattern.

**Install:** `npx skills add fgbyte/skills --skill penpot-loop`

### [design-md-to-tailwind-v4](design-md-to-tailwind-v4/)
Converts a `DESIGN.md` file into a `globals.css` ready for Tailwind CSS v4 with `@theme` directives. Includes optional `shadcn/ui` compatibility mode.

**Install:** `npx skills add fgbyte/skills --skill design-md-to-tailwind-v4`

## Architecture

These skills follow the baton-passing loop pattern:

1. Agent reads task from `.design/next-prompt.md`
2. Extracts design data via design tool MCP (Figma or Penpot)
3. Exports assets (SVG, PNG) from design nodes
4. Converts design to frontend code
5. Verifies rendered output visually with Playwriter
6. Writes next task to continue the loop


## Related Skills

| Skill | Purpose |
|-------|---------|
| `design-md` | Synthesizes a `DESIGN.md` from existing design files |
| `shadcn-ui` | Guidance for integrating shadcn/ui components |
| `stitch-loop` | Iteratively builds websites using Stitch |

## Usage

Each skill has its own `SKILL.md` with detailed instructions. Typically you activate a skill when the user's request matches its description — for example, mentioning "Figma" or "convert DESIGN.md to Tailwind".

```bash
# Install a specific skill
npx skills add fgbyte/skills --skill <skill-name>

# Install all skills
npx skills add fgbyte/skills
```