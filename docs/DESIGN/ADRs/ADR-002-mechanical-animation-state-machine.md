# ADR-002: Mechanical Animation State Machine

## Status

Proposed/Accepted

## Context

"The Burnt Archives" requires a cinematic, physical interaction model where clicking a "Burnt CD" triggers a mechanical sequence in a 1998-era CD player. This involves multiple coordinated movements: lid opening, CD flight path, lid closing, and disc spinning.

## Decision

We utilize a **Zustand-based State Machine** (`useCDPlayerSequence.ts`) to manage the global mechanical state.

### State Flow:

1. `IDLE`: Waiting for user interaction.
2. `OPENING`: Lid begins rotation animation.
3. `WAITING_FOR_CD`: Lid is open, waiting for CD flight to conclude.
4. `LOADING`: CD is flying from its workbench position to the player tray.
5. `CLOSING`: Lid closes after CD is seated.
6. `READING`: Disc spins at high speed; LCD shows reading status.
7. `PLAYING`: Final state; navigation occurs.

### Technical Details

- **Interpolation**: R3F `useFrame` delta is used for smooth rotation/position transitions.
- **Zustand**: Provides reactive state accessible by both the `CDPlayer` component and individual `BurntCD` instances.

## Consequences

- **Pros**: Centralized logic for complex multi-component animations; predictable state transitions.
- **Cons**: Requires synchronization between global state and local component animations (e.g., flight path).
