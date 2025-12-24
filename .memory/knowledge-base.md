# Knowledge Base

## Purpose

This file accumulates patterns, learnings, and best practices discovered during the project. It's a living document that grows with experience.

---

## Patterns We've Learned

### Pattern 1: High-Fidelity CD Iridescence

- **Context**: Rendering the data side of a "Burnt CD" artifact.
- **Implementation**: Use `meshPhysicalMaterial` with `iridescence: 1.0`, `iridescenceIOR: 1.3`, and `iridescenceThicknessRange: [200, 500]`.
- **Reference**: [BurntCD.tsx:66-79](file:///Users/soup/Projects/deepResearch/anti-portfolio/src/components/canvas/BurntCD.tsx#L66-L79)

### Pattern 2: Mechanical State Machine (CD Player)

- **Context**: Orchestrating the 5-step loading sequence.
- **Implementation**: `IDLE → LID_OPEN (delay 0) → LOADING (delay 500) → LID_CLOSE (delay 1500) → READING (delay 2100) → PLAYING (delay 5000)`.
- **Timing**: Accurate to the industrial timing of 90s CD players.

### Pattern 2: [Pattern Name]

- **Context**: [When to use this pattern]
- **Implementation**: [How to implement it]
- **Example**: [Code or example]
- **Benefits**: [Why it's useful]
- **Trade-offs**: [What to consider]

---

## Best Practices

### Development

- **Practice 1**: [Description]
- **Practice 2**: [Description]
- **Practice 3**: [Description]

### Documentation

- **Practice 1**: [Description]
- **Practice 2**: [Description]

### Testing

- **Practice 1**: [Description]
- **Practice 2**: [Description]

---

## Anti-Patterns (What to Avoid)

### Anti-Pattern 1: [Name]

- **What it is**: [Description]
- **Why it's bad**: [Problems it causes]
- **Better approach**: [What to do instead]

### Anti-Pattern 2: [Name]

- **What it is**: [Description]
- **Why it's bad**: [Problems it causes]
- **Better approach**: [What to do instead]

---

## Common Solutions

### Problem: [Problem Description]

**Solution**: [How we solved it]
**When to use**: [Context]
**Related**: [Links to debug-log entries, ADRs, etc.]

### Problem: [Problem Description]

**Solution**: [How we solved it]
**When to use**: [Context]
**Related**: [Links to debug-log entries, ADRs, etc.]

---

## Reusable Code Snippets

### Snippet 1: [Purpose]

```typescript
// Reusable code snippet
// Description of what it does
```

### Snippet 2: [Purpose]

```python
# Reusable code snippet
# Description of what it does
```

---

## Lessons Learned

### Lesson 1: [Topic]

- **What happened**: [Situation]
- **What we learned**: [Insight]
- **How we'll apply it**: [Future application]

### Lesson 2: [Topic]

- **What happened**: [Situation]
- **What we learned**: [Insight]
- **How we'll apply it**: [Future application]

---

## Useful Resources

### Documentation

- [Resource 1](url) - [Description]
- [Resource 2](url) - [Description]

### Tools

- [Tool 1](url) - [What it's useful for]
- [Tool 2](url) - [What it's useful for]

### Examples

- [Example 1](url) - [What it demonstrates]
- [Example 2](url) - [What it demonstrates]

---

## 🚀 SHOWCASE DEPLOYMENT (Vercel)

### 1. R3F Asset Optimization

- **Next.js `public` directory**: Use for models/textures to leverage Vercel's edge caching.
- **Optimization**: Run `gltf-pipeline` or Draco compression on models before deployment.

### 2. GitHub Automation CI/CD

- **Push Hook**: Ensure maintenance scripts run `pre-commit` or `pre-push`.
- **Branch Strategy**: `main` triggers Vercel production deployment; `dev` triggers preview.

---

## Tips & Tricks

### Tip 1: [Topic]

[Description of the tip]

### Tip 2: [Topic]

[Description of the tip]

---

## Notes

- Add entries as you discover patterns
- Update entries when you learn more
- Link to related debug-log entries
- Keep entries concise but complete
- Review and refine periodically

## 🚨 TROUBLESHOOTING & ERROR GUIDELINES

### 1. `RATE_LIMIT_ERROR_429` (GitHub API)

- **Cause**: Exceeded anonymous or authenticated limit.
- **Action**: Fallback to `EMERGENCY_MOCK_REPOS`. Set LCD state to `ERROR_429`.
- **Validation**: Check `src/services/github.ts` fallback array length.

### 2. `WEBGL_CONTEXT_LOST` (Performance)

- **Cause**: Too many high-res textures or complex shaders.
- **Action**: Pruned `DustParticles`, reduced `MeshReflectorMaterial` blur resolution.
- **Validation**: Monitor `R3F` stats window.

### 3. `HYDRATION_MISMATCH` (Next.js)

- **Cause**: Randomizing seeds for procedural desk layout on the server.
- **Action**: Use `useEffect` or `dynamic(() => ..., { ssr: false })` for the Canvas components.

## 🧹 MAINTENANCE AUTOMATION (Internal Design)

- **`PRE_BUILD_CLEANUP`**: Scans `/public` for unused temporary stickers and eliminates stale assets.
- **`STALE_FILE_PRUNER`**: Script to check for unused component variants or dead logic branches (triggered post-task).
- **`TEST_BEFORE_VIBE`**: Auto-runs `playwright` or `browser_eval` tests on navigation sequence before allowing commit.

---

## Last Updated

2025-12-24
