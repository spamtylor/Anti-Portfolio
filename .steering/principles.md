# Project Principles

## Core Principles

### 1. Clarity First

**Every file, function, and decision should be immediately understandable.**

- Use clear, descriptive names
- Write self-documenting code
- Explain the "why" not just the "what"
- Remove ambiguity

### 2. Metaphor Fidelity

**The "Burnt CD" and "90s Workbench" metaphor is absolute.**

- All 3D assets must align with the 1998 industrial grunge aesthetic.
- Avoid clean, modern, or abstract UI elements within the 3D scene.

### 3. Mechanical Fidelity

**3D interactions must follow mechanical state machines.**

- Animation sequences must be physically grounded (Lid Open → Load Disc → Lid Close).
- No "magic" teleports or immediate UI transitions in the 3D context.

### 2. Self-Healing

**Systems that recover gracefully from errors.**

- Automatic error recovery where possible
- Graceful degradation
- Clear error messages
- Health checks and monitoring

### 3. Self-Organizing

**Structure that guides contributors naturally.**

- Consistent file organization
- Clear naming conventions
- Logical directory structure
- Navigation guides

### 4. Shareable

**Anyone can understand and contribute within minutes.**

- Clear onboarding documentation
- Well-documented code
- Obvious project structure
- Accessible knowledge base

### 5. Documented

**Knowledge persists beyond individual memory.**

- Document decisions (ADRs)
- Document problems (debug log)
- Document patterns (knowledge base)
- Document context (memory files)

---

## Development Principles

### Code Quality

- **Readability** over cleverness
- **Simplicity** over complexity
- **Maintainability** over optimization (premature)
- **Testing** is not optional

### File Organization

- **Small files** are better than large files
- **Single responsibility** per file/function
- **Clear boundaries** between modules
- **Logical grouping** of related code

### Documentation

- **Document as you go** - not later
- **Update docs** when code changes
- **Explain why** - not just what
- **Keep docs current** - outdated docs are worse than no docs

---

## Communication Principles

### Honesty

- **Say "I don't know"** when uncertain
- **Admit mistakes** quickly
- **Ask for help** when stuck
- **Share knowledge** freely

### Clarity

- **Be specific** - avoid vague language
- **Be concise** - respect others' time
- **Be actionable** - provide next steps
- **Be transparent** - share reasoning

### Collaboration

- **Propose alternatives** when uncertain
- **Invite feedback** on decisions
- **Document discussions** for future reference
- **Respect different perspectives**

---

## Quality Principles

### Testing

- **Test first** when possible (TDD)
- **Test edge cases** - not just happy paths
- **Keep tests simple** - easy to understand
- **Maintain high coverage** - but quality over quantity

### Security

- **Security by design** - not an afterthought
- **Validate inputs** - never trust user input
- **Principle of least privilege** - minimal permissions
- **Document security decisions** - in ADRs

### Performance

- **Measure first** - don't optimize prematurely
- **Profile before optimizing** - know the bottleneck
- **Cache aggressively** - but validate cache invalidation
- **Respect rate limits** - always

---

## Maintenance Principles

### Refactoring

- **Refactor continuously** - not in big batches
- **Improve incrementally** - small, safe changes
- **Remove dead code** - regularly
- **Update dependencies** - keep current

### Knowledge Management

- **Document learnings** - in knowledge base
- **Log problems** - in debug log
- **Update context** - keep memory current
- **Share patterns** - help others learn

### Evolution

- **Start simple** - add complexity only when needed
- **Iterate based on feedback** - learn and improve
- **Deprecate gracefully** - with clear migration paths
- **Version appropriately** - semantic versioning

---

## AI Agent Principles

### Honesty & Accountability

- **Say "I don't know"** when uncertain. Hallucination is a P0 failure.
- **Troubleshoot by Design**: Every implemented feature must include a logic flow and a potential failure mode explanation in the knowledge base.
- **Reference Proof**: Use `browser_eval` and `terminal_read` to verify all rendering/build assumptions.

### Autonomous Maintenance

- **Self-Cleaning**: Prefer scripts that prune temporary files and eliminate stale code post-execution.
- **Strict Testing**: Run `playwright` or `browser_eval` tests before declaring a feature "DONE."

---

## Success Metrics

### Code Quality

- Test coverage > 80%
- Zero critical security vulnerabilities
- All files within size limits
- Documentation coverage > 90%

### Project Health

- Build success rate > 95%
- Average bug resolution time < 1 day
- New contributor onboarding < 1 day
- Decision traceability 100%

### Knowledge Retention

- All problems documented
- All decisions have ADRs
- Knowledge base is searchable
- Context is current

---

## Remember

**Principles guide decisions, but context matters.**

- Apply principles consistently
- But adapt to specific situations
- Document exceptions in ADRs
- Learn from experience

### 9. Continuous Sync

**GitHub is the source of truth. Deployment is the reflection of the docs.**

- Automate pushes to GitHub post-verification.
- Documentation changes (principles, ADRs) must precede or accompany code changes.

### 10. Showcase Integrity

**The "production" deployment is always showcase-ready.**

- Never push broken builds to the main branch.
- Performance in Vercel/Netlify for 3D content must be verified via Lighthouse/Chrome DevTools.
