# Figma Build Loop Skill

Teaches agents to iteratively build websites from Figma designs using an autonomous baton-passing loop pattern.

## Install

```bash
npx skills add fgbyte/skills --skill figma-loop
```

## What It Does

Enables continuous, autonomous design-to-code development through a "baton" system:

1. Agent reads task from `.figma/next-prompt.md`
2. Extracts design data from Figma using Figma MCP tools
3. Downloads assets (SVGs, PNGs, GIFs) from Figma nodes
4. Converts the design to frontend code
5. Verifies the rendered output visually with Playwriter
6. Writes next task to continue the loop

## Prerequisites

- Figma MCP Server access
- Playwriter MCP Server access
- A Figma file key from a `figma.com/design/<fileKey>/...` or `figma.com/file/<fileKey>/...` URL
- A `.figma/DESIGN.md` file (generate from Figma or create manually)
- A `.figma/PROJECT.md` file for project context
- A `.figma/next-prompt.md` baton file for the current component task

## Example Prompt

```text
Read my .figma/next-prompt.md and build the component from the Figma design, then prepare the next iteration.
```

## Skill Structure

```
figma-loop/
├── SKILL.md              — Core pattern instructions
├── README.md             — This file
├── resources/
│   ├── baton-schema.md   — Baton file format spec
│   └── project-template.md  — PROJECT.md/DESIGN.md templates
└── examples/
    ├── next-prompt.md    — Example baton
    └── PROJECT.md        — Example project constitution
```

## Works With

- **`design-md` skill**: Generate `DESIGN.md` from existing designs
- **CI/CD**: GitHub Actions can trigger new iterations on push
- **Agent chains**: Dispatch to other agents (Jules, etc.)

## Learn More

See [SKILL.md](./SKILL.md) for complete instructions.
