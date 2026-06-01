# Penpot Build Loop Skill

Teaches agents to iteratively build websites from Penpot designs using an autonomous baton-passing loop pattern.

## Install

```bash
npx skills add fgbyte/skills --skill penpot-loop
```

## What It Does

Enables continuous, autonomous design-to-code development through a "baton" system:

1. Agent reads task from `.penpot/next-prompt.md`
2. Extracts design data from Penpot via `execute_code` (with `penpotUtils` helpers)
3. Exports assets (SVG, PNG) from shapes using `export_shape`
4. Converts the design to frontend code
5. Verifies the rendered output visually with Playwriter
6. Writes next task to continue the loop

## Prerequisites

- Penpot MCP Server (`@penpot/mcp`) running locally — default HTTP endpoint `http://localhost:4401/mcp`
- Penpot MCP Plugin loaded in Penpot (WebSocket on port `4402`) from `http://localhost:4400/manifest.json`
- A Penpot file open in a focused browser tab with the plugin connected
- Playwriter MCP Server access for visual verification
- A `.penpot/PROJECT.md` file for project context
- A `.penpot/DESIGN.md` file for design system tokens
- A `.penpot/next-prompt.md` baton file for the current component task

## Example Prompt

```text
Read my .penpot/next-prompt.md and build the component from the Penpot design, then prepare the next iteration.
```

## Skill Structure

```
penpot-loop/
├── SKILL.md              — Core pattern instructions
├── README.md             — This file
├── examples/
│   ├── next-prompt.md    — Example baton
│   └── PROJECT.md        — Example project constitution
├── resources/
│   ├── baton-schema.md   — Baton file format spec
│   └── project-template.md  — PROJECT.md/DESIGN.md templates
├── scripts/
│   └── save_base64_asset.js  — base64 → file decoder for assets
└── evals/
    └── evals.json  — Evaluation cases
```

## Works With

- **`design-md` skill**: Synthesize `DESIGN.md` from an existing Penpot file before starting the loop
- **CI/CD**: GitHub Actions can trigger new iterations on push
- **Agent chains**: Dispatch to other agents (Jules, etc.)

## Learn More

See [SKILL.md](./SKILL.md) for complete instructions.
