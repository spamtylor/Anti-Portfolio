# Project Foundation Template

## Philosophy

**World-Class Principles:**
- 🎯 **Clarity First** - Every file, function, and decision should be immediately understandable
- 🔄 **Self-Healing** - Systems that recover gracefully from errors
- 📐 **Self-Organizing** - Structure that guides contributors naturally
- 🤝 **Shareable** - Anyone can understand and contribute within minutes
- 📚 **Documented** - Knowledge persists beyond individual memory

---

## Project Structure

```
PROJECT_NAME/
├── .github/
│   ├── workflows/          # CI/CD automation
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── SPEC/               # Technical specifications
│   │   ├── api-design.md
│   │   ├── data-models.md
│   │   └── protocol.md    # Replace with your protocol/spec
│   ├── DESIGN/             # Architecture & design decisions
│   │   ├── ADRs/          # Architecture Decision Records
│   │   ├── architecture.md
│   │   └── patterns.md
│   ├── MEMORY/             # Knowledge base & learnings
│   │   ├── decisions.md
│   │   ├── learnings.md
│   │   └── patterns.md
│   └── GUIDES/             # How-to guides
│       ├── getting-started.md
│       ├── contributing.md
│       └── deployment.md
│
├── src/                    # Source code (customize structure)
│   ├── [component1]/      # Replace with your components
│   ├── [component2]/
│   └── utils/              # Shared utilities
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── scripts/
│   ├── setup.sh           # Project setup
│   ├── validate.sh        # Validation checks
│   └── heal.sh            # Self-healing routines
│
├── .diamond/              # Critical project data (diamond = most valuable)
│   ├── project-state.json
│   ├── dependencies.json
│   └── health-status.json
│
├── .memory/               # Project memory & context
│   ├── context.md         # Current project context
│   ├── decisions-log.md   # Decision history
│   ├── knowledge-base.md  # Accumulated knowledge
│   └── debug-log.md       # Problems & solutions log
│
├── .steering/             # Project steering & governance
│   ├── principles.md      # Core principles
│   ├── code-style.md      # Code style guide
│   ├── git-workflow.md    # Git workflow
│   ├── code-review.md     # Code review guidelines
│   ├── release-process.md # Release process
│   ├── security-policy.md # Security policy
│   ├── logging-standards.md # Logging standards
│   ├── ai-agent-rules.md  # AI agent interaction rules
│   └── context-management.md  # Context window strategies
│
├── TODO.md                # Task management
├── SPEC.md                # Project specification
├── DESIGN.md              # Design document
├── CONTRIBUTING.md
├── README.md
├── CHANGELOG.md
└── LICENSE
```

---

## 1. SPEC (Specification)

### Purpose
Define **what** we're building, **why** we're building it, and **how** it should behave.

### Structure

**SPEC.md** (Main specification document)

```markdown
# Project Specification

## Overview
[What this project is, its purpose, and goals]

## Requirements
[Functional and non-functional requirements]

## Scope
[What's in scope, what's out of scope]

## Success Criteria
[How we measure success]

## Constraints
[Technical, business, or resource constraints]
```

**docs/SPEC/** (Detailed technical specs)
- `mcp-protocol.md` - MCP protocol compliance
- `api-design.md` - API design and contracts
- `data-models.md` - Data structures and schemas
- `security.md` - Security requirements
- `performance.md` - Performance requirements

### Specification Principles
- ✅ **Precise** - No ambiguity
- ✅ **Testable** - Can verify compliance
- ✅ **Versioned** - Track changes over time
- ✅ **Living** - Updated as we learn

---

## 2. DESIGN (Architecture & Design Decisions)

### Purpose
Define **how** we're building it, architectural patterns, and design rationale.

### Structure

**DESIGN.md** (Main design document)

```markdown
# Design Document

## Architecture Overview
[High-level architecture diagram and description]

## Design Principles
[Core principles guiding design decisions]

## Technology Stack
[Technologies chosen and why]

## Component Design
[How components interact]

## Data Flow
[How data moves through the system]
```

**docs/DESIGN/ADRs/** (Architecture Decision Records)

Format for each ADR:
```markdown
# ADR-001: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
[What situation led to this decision]

## Decision
[What we decided to do]

## Consequences
[Positive and negative impacts]

## Alternatives Considered
[What else we considered and why we didn't choose it]
```

### Design Principles
- ✅ **Document decisions** - Every major decision gets an ADR
- ✅ **Explain why** - Not just what, but why
- ✅ **Consider alternatives** - Show we thought it through
- ✅ **Track consequences** - Learn from decisions

---

## 3. TODO (Task Management)

### Purpose
Track **what needs to be done**, priorities, and progress.

### Structure

**TODO.md** (Main task list)

```markdown
# TODO

## Current Sprint
[Active tasks being worked on]

## Backlog
[Planned tasks]

## Blocked
[Tasks waiting on dependencies]

## Completed
[Recently finished tasks]
```

### Task Format
```markdown
### [Priority] Task Title
- **Status**: [Not Started | In Progress | Blocked | Done]
- **Assignee**: [Who's working on it]
- **Due Date**: [When it should be done]
- **Dependencies**: [What it depends on]
- **Description**: [What needs to be done]
- **Acceptance Criteria**: [How we know it's done]
```

### TODO Principles
- ✅ **Prioritized** - Clear what's most important
- ✅ **Actionable** - Each task is specific and doable
- ✅ **Tracked** - Status is always current
- ✅ **Linked** - Connected to specs and design docs

---

## 4. DIAMOND DATA (Critical Project Data)

### Purpose
Store the **most valuable, frequently accessed** project data in a structured, queryable format.

### Structure

**.diamond/** (Diamond = most valuable data)

**project-state.json**
```json
{
  "version": "0.1.0",
  "status": "active",
  "lastUpdated": "2025-12-21T00:00:00Z",
  "health": {
    "overall": "healthy",
    "components": {
      "server": "healthy",
      "tests": "passing",
      "docs": "up-to-date"
    }
  },
  "metrics": {
    "testCoverage": 85,
    "documentationCoverage": 90
  }
}
```

**dependencies.json**
```json
{
  "runtime": {
    "node": ">=18.0.0",
    "python": ">=3.9.0"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {},
  "lastAudited": "2025-12-21T00:00:00Z"
}
```

**health-status.json**
```json
{
  "timestamp": "2025-12-21T00:00:00Z",
  "checks": {
    "build": { "status": "pass", "duration": "2.3s" },
    "tests": { "status": "pass", "coverage": 85 },
    "lint": { "status": "pass", "issues": 0 },
    "security": { "status": "pass", "vulnerabilities": 0 }
  }
}
```

### Diamond Data Principles
- ✅ **Structured** - JSON/YAML for easy parsing
- ✅ **Current** - Always up-to-date
- ✅ **Queryable** - Easy to extract insights
- ✅ **Automated** - Generated by scripts/CI

---

## 5. MEMORY (Knowledge Base)

### Purpose
Preserve **institutional knowledge**, learnings, and context that persists beyond individual memory.

### Debug/Problem Log

**.memory/debug-log.md** - Document every problem and solution

```markdown
# Debug Log

## Problem ID: DBG-001
- **Date**: 2025-12-21
- **Problem**: [Clear description of the issue]
- **Symptoms**: [What we observed]
- **Root Cause**: [Why it happened]
- **Solution**: [How we fixed it]
- **Prevention**: [How to avoid it in future]
- **Related**: [Links to issues, PRs, code]
```

### Debug Log Principles
- ✅ **Every problem documented** - No issue is too small
- ✅ **Solution included** - How we solved it
- ✅ **Prevention strategy** - How to avoid recurrence
- ✅ **Searchable** - Easy to find similar problems

### Structure

**.memory/** (Project memory)

**context.md**
```markdown
# Current Project Context

## What We're Building
[Current focus and goals]

## Current State
[Where we are now]

## Recent Changes
[What changed recently]

## Next Steps
[What's coming next]
```

**decisions-log.md**
```markdown
# Decision Log

## 2025-12-21: Chose STDIO for initial transport
- **Decision**: Use STDIO transport for MVP
- **Rationale**: Simplest to implement, fastest performance
- **Impact**: Can only support local clients initially
- **Future**: Will add StreamableHTTP for remote access
```

**knowledge-base.md**
```markdown
# Knowledge Base

## Patterns We've Learned
[Reusable patterns discovered]

## Common Issues & Solutions
[Problems we've solved]

## Best Practices
[What works well for us]

## Anti-Patterns
[What to avoid]
```

### Memory Principles
- ✅ **Persistent** - Knowledge survives team changes
- ✅ **Searchable** - Easy to find information
- ✅ **Accumulative** - Builds over time
- ✅ **Contextual** - Includes why, not just what

---

## Self-Healing Mechanisms

### Automated Health Checks

**scripts/heal.sh**
```bash
#!/bin/bash
# Self-healing script that checks and fixes common issues

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js not found - installing..."
    # Auto-install logic
fi

# Check for outdated dependencies
npm outdated && npm update

# Run tests
npm test || {
    echo "❌ Tests failing - attempting auto-fix..."
    # Auto-fix logic
}

# Check documentation
./scripts/validate-docs.sh || {
    echo "⚠️  Documentation issues found"
}
```

### Self-Organizing Patterns

1. **Convention over Configuration**
   - Standard file locations
   - Naming conventions
   - Automatic discovery

2. **Validation Scripts**
   - `scripts/validate.sh` - Checks project health
   - `scripts/check-spec.sh` - Validates spec compliance
   - `scripts/check-design.sh` - Validates design compliance

3. **Auto-Generated Documentation**
   - API docs from code
   - Architecture diagrams from code structure
   - Dependency graphs

---

## Workflow Standards

### Development Workflow

1. **Start Work**
   ```bash
   # Update TODO.md with task
   # Create feature branch
   git checkout -b feature/your-feature
   ```

2. **During Development**
   ```bash
   # Run validation
   ./scripts/validate.sh
   
   # Run tests
   npm test
   
   # Update docs as you go
   ```

3. **Before Commit**
   ```bash
   # Self-healing check
   ./scripts/heal.sh
   
   # Update .diamond/project-state.json
   # Update .memory/context.md if needed
   ```

4. **Commit**
   ```bash
   # Follow conventional commits
   git commit -m "feat: add new tool"
   ```

### Documentation Workflow

1. **Spec Changes**
   - Update `SPEC.md` or `docs/SPEC/*.md`
   - Update version if breaking change
   - Link to related ADRs

2. **Design Decisions**
   - Create ADR in `docs/DESIGN/ADRs/`
   - Update `DESIGN.md` if major change
   - Update `.memory/decisions-log.md`

3. **Knowledge Capture**
   - Add to `.memory/knowledge-base.md` as you learn
   - Update `.memory/context.md` weekly
   - Document patterns in `docs/DESIGN/patterns.md`

---

## Quality Gates

### Before Merging PR

- [ ] All tests pass
- [ ] Code coverage maintained/improved
- [ ] Documentation updated
- [ ] SPEC.md reviewed if behavior changed
- [ ] ADR created if architecture changed
- [ ] TODO.md updated
- [ ] `.diamond/project-state.json` updated
- [ ] `.memory/context.md` updated if significant

### Weekly Review

- [ ] Review and update TODO.md
- [ ] Update `.memory/context.md`
- [ ] Review `.diamond/health-status.json`
- [ ] Archive completed ADRs
- [ ] Update knowledge base with learnings

---

## Navigation Guide

### For New Contributors

1. **Start Here**: `README.md`
2. **Understand What**: `SPEC.md`
3. **Understand How**: `DESIGN.md`
4. **See What's Needed**: `TODO.md`
5. **Get Context**: `.memory/context.md`
6. **Check Health**: `.diamond/health-status.json`

### For Developers

1. **Code Structure**: `src/` directory
2. **Tests**: `tests/` directory
3. **Patterns**: `docs/DESIGN/patterns.md`
4. **API Spec**: `docs/SPEC/api-design.md`

### For Architects

1. **Architecture**: `docs/DESIGN/architecture.md`
2. **Decisions**: `docs/DESIGN/ADRs/`
3. **Protocol**: `docs/SPEC/mcp-protocol.md`
4. **Knowledge**: `.memory/knowledge-base.md`

---

## Automation Scripts

### scripts/setup.sh
```bash
#!/bin/bash
# Initial project setup
# - Install dependencies
# - Create directory structure
# - Initialize .diamond files
# - Set up git hooks
```

### scripts/validate.sh
```bash
#!/bin/bash
# Comprehensive validation
# - Code quality checks
# - Test execution
# - Documentation validation
# - Spec compliance
# - Design compliance
```

### scripts/heal.sh
```bash
#!/bin/bash
# Self-healing routine
# - Fix common issues
# - Update dependencies
# - Regenerate docs
# - Fix formatting
```

### scripts/generate-docs.sh
```bash
#!/bin/bash
# Auto-generate documentation
# - API docs from code
# - Architecture diagrams
# - Dependency graphs
```

---

## Success Metrics

### Project Health Indicators

- **Test Coverage**: >80%
- **Documentation Coverage**: >90%
- **Spec Compliance**: 100%
- **Build Success Rate**: >95%
- **Time to Understand**: <30 minutes for new contributors

### Self-Organization Indicators

- **File Discovery**: Can find any file in <2 minutes
- **Decision Traceability**: Every decision has an ADR
- **Knowledge Retention**: New contributors productive in <1 day

---

## Next Steps

1. **Initialize Structure**
   ```bash
   ./scripts/setup.sh
   ```

2. **Create Initial SPEC.md**
   - Define project goals
   - List requirements
   - Set success criteria

3. **Create Initial DESIGN.md**
   - Choose technology stack
   - Define architecture
   - Document design principles

4. **Populate TODO.md**
   - Break down into tasks
   - Set priorities
   - Assign owners

5. **Initialize .diamond/**
   - Create project-state.json
   - Set up health checks
   - Initialize dependencies.json

6. **Start .memory/**
   - Document initial context
   - Begin decision log
   - Start knowledge base

---

## 6. STEERING (Project Governance)

### Purpose
Provide **guidance, principles, and rules** that steer the project toward success.

### Structure

**.steering/principles.md**
```markdown
# Project Principles

## Core Principles
[Fundamental beliefs that guide all decisions]

## Development Principles
[How we write code]

## Documentation Principles
[How we document]

## Communication Principles
[How we communicate]
```

**.steering/guidelines.md**
```markdown
# Development Guidelines

## Code Guidelines
[Standards for code quality]

## File Size Guidelines
[Maximum file sizes to maintain context]

## Documentation Guidelines
[How to write docs]

## Testing Guidelines
[Testing standards]
```

**.steering/ai-agent-rules.md**
```markdown
# AI Agent Interaction Rules

## Honesty & Transparency
- Agents MUST say "I don't know" when uncertain
- Agents MUST propose alternative approaches when stuck
- Agents MUST document assumptions

## Problem-Solving Approach
1. Acknowledge uncertainty
2. Propose investigation path
3. Execute investigation
4. Document findings
5. Implement solution
6. Update debug log

## Context Management
- Break large tasks into smaller chunks
- Use context windows efficiently
- Document context boundaries
```

**.steering/context-management.md**
```markdown
# Context Window Management

## File Size Limits
- **Spec files**: Max 500 lines
- **Design docs**: Max 1000 lines
- **Code files**: Max 300 lines
- **Documentation**: Max 800 lines

## Strategies
- Split large files into logical sections
- Use includes/imports for shared content
- Create summaries for long documents
- Use diagrams instead of verbose descriptions
```

### Steering Principles
- ✅ **Clear rules** - No ambiguity
- ✅ **Enforced** - Checked by automation
- ✅ **Evolving** - Updated as we learn
- ✅ **Accessible** - Easy to find and reference

---

## 7. AI Agent Guidelines

### Core Rules for AI Agents

1. **Honesty First**
   ```
   ✅ "I don't know how to do X, but I can investigate Y approach"
   ❌ Making up solutions when uncertain
   ```

2. **Propose Alternatives**
   ```
   ✅ "I'm not sure about approach A. Let me try approach B or C"
   ❌ Continuing with uncertain approach
   ```

3. **Document Everything**
   ```
   ✅ Log problems in .memory/debug-log.md
   ✅ Update context in .memory/context.md
   ✅ Document assumptions
   ```

4. **Respect Context Limits**
   ```
   ✅ Break large tasks into chunks
   ✅ Use file size limits
   ✅ Create summaries for long content
   ```

5. **Rate Limiting Awareness**
   ```
   ✅ Batch operations when possible
   ✅ Cache results
   ✅ Monitor API usage
   ✅ Implement backoff strategies
   ```

### AI Agent Workflow

```
1. Understand Task
   ↓
2. Check if I know how
   ├─ Yes → Proceed
   └─ No → Say "I don't know" + Propose investigation
   ↓
3. Investigate/Research
   ↓
4. Document findings
   ↓
5. Implement solution
   ↓
6. Update debug log if problem encountered
   ↓
7. Verify solution
```

---

## 8. Context Window Management

### File Size Guidelines

| File Type | Max Lines | Reason |
|-----------|-----------|--------|
| Spec files | 500 | Easy to review and understand |
| Design docs | 1000 | Comprehensive but manageable |
| Code files | 300 | Maintainable, testable |
| Documentation | 800 | Readable in one session |
| ADRs | 200 | Focused decision records |

### Strategies

1. **Split Large Files**
   ```markdown
   # Instead of one 2000-line file:
   docs/SPEC/
   ├── api-overview.md (200 lines)
   ├── api-endpoints.md (300 lines)
   ├── api-authentication.md (200 lines)
   └── api-examples.md (300 lines)
   ```

2. **Use Summaries**
   ```markdown
   # Create summary files
   docs/SPEC/README.md  # Overview with links
   ```

3. **Modular Documentation**
   ```markdown
   # Use includes
   {% include "api-endpoints.md" %}
   ```

4. **Context Boundaries**
   - Each file should be understandable in isolation
   - Clear dependencies between files
   - Navigation guides for finding related content

---

## 9. Rate Limiting & API Management

### Awareness

**Always consider:**
- API rate limits
- Token usage
- Request costs
- Response times

### Strategies

1. **Batching**
   ```typescript
   // Batch multiple operations
   const results = await Promise.all([
     operation1(),
     operation2(),
     operation3()
   ]);
   ```

2. **Caching**
   ```typescript
   // Cache expensive operations
   const cache = new Map();
   if (cache.has(key)) return cache.get(key);
   const result = await expensiveOperation();
   cache.set(key, result);
   ```

3. **Backoff**
   ```typescript
   // Exponential backoff for retries
   async function retryWithBackoff(fn, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await sleep(Math.pow(2, i) * 1000);
       }
     }
   }
   ```

4. **Monitoring**
   ```typescript
   // Track API usage
   const apiUsage = {
     requests: 0,
     tokens: 0,
     lastReset: Date.now()
   };
   ```

### Documentation

Document rate limits in:
- `docs/SPEC/api-design.md` - API limits
- `.diamond/project-state.json` - Current usage
- `.memory/debug-log.md` - Rate limit issues

---

## Conclusion

This foundation provides:

✅ **Clarity** - Everyone knows where to find things  
✅ **Structure** - Self-organizing project layout  
✅ **Memory** - Knowledge persists  
✅ **Health** - Self-healing mechanisms  
✅ **Quality** - Built-in quality gates  
✅ **Shareability** - Easy for others to understand and contribute

**Remember**: A solid foundation saves time, reduces errors, and enables world-class results.

