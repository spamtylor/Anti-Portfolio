# ADR-001: Metaphor Shift (Graveyard → Burnt Archives)

## Status

Accepted

## Context

The project was originally called "The Anti-Portfolio" and used a "3D Graveyard" metaphor with tombstones representing abandoned repositories. A new Master Prompt ("The Burnt Archives") was introduced, which proposes a "1998 Teenage Bedroom Workbench" metaphor with Burnt CDs representing repositories.

## Decision

We will fully pivot to the "Burnt Archives" metaphor. This involves:

- Replacing `Tombstone` components with `BurntCD` components.
- Replacing the `Graveyard` environment with a `Workbench` environment.
- Implementing a mechanical CD Player interaction sequence.
- Adopting a "Neo-Industrial Grunge" aesthetic (CRT scanlines, distressed materials).

## Consequences

- **Positive:** Higher aesthetic cohesion, more unique interaction model, stronger emotional resonance (nostalgia/grunge).
- **Negative:** Abandonment of existing "Graveyard" assets (Tombstones, specific graveyard lighting).
- **Complexity:** Higher technical requirements for animation (multi-step sequence) and materials (PBR iridescence, transmission).

## Alternatives Considered

1. **Hybrid Approach:** A graveyard of technology (CRTs as tombstones). Rejected as being less focused and "muddy" in vision.
2. **Stick with Graveyard:** Rejected due to the strong aesthetic appeal and technical specificity of the "Burnt Archives" prompt.
