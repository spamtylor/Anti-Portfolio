# Debug Log: Problems & Solutions

## Purpose

This log documents every problem we encounter and how we solved it. This creates a searchable knowledge base for future reference.

---

## Log Entry Format

```markdown
## Problem ID: DBG-XXX
- **Date**: YYYY-MM-DD HH:MM
- **Context**: What we were trying to accomplish
- **Problem**: Clear description of the issue
- **Symptoms**: What we observed (error messages, unexpected behavior)
- **Environment**: OS, versions, dependencies
- **Root Cause**: Why it happened (after investigation)
- **Solution**: Step-by-step how we fixed it
- **Prevention**: How to avoid this in future
- **Related**: Links to issues, PRs, code, ADRs
- **Tags**: #error-type #component #severity
- **Time Spent**: How long to resolve
```

---

## Problem Categories

### #setup - Initial setup issues
### #dependencies - Dependency/package issues
### #configuration - Configuration problems
### #api - API integration issues
### #transport - Transport/protocol issues
### #performance - Performance problems
### #security - Security concerns
### #testing - Test failures
### #documentation - Documentation issues
### #deployment - Deployment problems

---

## Problems Log

### Template Entry

```markdown
## Problem ID: DBG-001
- **Date**: 2025-12-21 10:00
- **Context**: Setting up initial project structure
- **Problem**: [Description]
- **Symptoms**: [What we saw]
- **Environment**: macOS 25.1.0, Node.js 20.x
- **Root Cause**: [Why it happened]
- **Solution**: [How we fixed it]
- **Prevention**: [How to avoid]
- **Related**: [Links]
- **Tags**: #setup #configuration
- **Time Spent**: 15 minutes
```

---

## Search Guide

### Finding Similar Problems

1. **By Tag**: Search for `#error-type`
2. **By Component**: Search for `#component`
3. **By Symptom**: Search for error message keywords
4. **By Date**: Problems are chronological

### Common Patterns

- **Setup issues**: Usually #setup #configuration
- **Runtime errors**: Usually #api #transport
- **Build failures**: Usually #dependencies #configuration

---

## Statistics

- **Total Problems Logged**: 0
- **Average Resolution Time**: TBD
- **Most Common Category**: TBD
- **Last Updated**: 2025-12-21

---

## Notes

- Every problem gets a unique ID (DBG-XXX)
- Problems are never deleted, only marked as resolved
- Solutions are updated if better approaches are found
- Related problems are cross-referenced

