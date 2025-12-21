# Context Window Management

## Philosophy

**No file should be too long to analyze and maintain context.**

We must respect context window limitations to ensure:
- ✅ Files are readable in one session
- ✅ AI agents can process entire files
- ✅ Developers can understand files quickly
- ✅ Documentation remains maintainable

---

## File Size Limits

| File Type | Max Lines | Max Characters | Rationale |
|-----------|-----------|---------------|-----------|
| **Spec Files** | 500 | ~25,000 | Easy to review in one session |
| **Design Docs** | 1,000 | ~50,000 | Comprehensive but manageable |
| **Code Files** | 300 | ~15,000 | Maintainable, testable units |
| **Documentation** | 800 | ~40,000 | Readable without scrolling fatigue |
| **ADRs** | 200 | ~10,000 | Focused decision records |
| **README** | 500 | ~25,000 | Quick reference, not exhaustive |
| **Debug Log Entry** | 100 | ~5,000 | Concise problem description |

### Enforcement

- **Pre-commit hooks** check file sizes
- **CI/CD** fails if limits exceeded
- **Manual review** for exceptions (must be justified)

---

## Strategies for Large Content

### 1. Split into Logical Sections

**Instead of:**
```
docs/SPEC/api-design.md (2000 lines)
```

**Do:**
```
docs/SPEC/
├── api-overview.md (200 lines) - High-level overview
├── api-authentication.md (300 lines) - Auth details
├── api-endpoints.md (500 lines) - Endpoint specs
├── api-examples.md (400 lines) - Usage examples
└── api-errors.md (200 lines) - Error handling
```

### 2. Create Summary Files

**Main file:**
```markdown
# API Design Overview

[Brief overview - 200 lines]

## Sections
- [Authentication](./api-authentication.md)
- [Endpoints](./api-endpoints.md)
- [Examples](./api-examples.md)
- [Error Handling](./api-errors.md)
```

**Detail files:**
- Each focused on one aspect
- Self-contained
- Linked from overview

### 3. Use Modular Documentation

**Pattern:**
```markdown
# Main Document

## Introduction
[Overview]

## Core Concepts
{% include "concepts.md" %}

## Implementation
{% include "implementation.md" %}

## Examples
{% include "examples.md" %}
```

### 4. Extract Code to Separate Files

**Instead of:**
```markdown
# Guide with 500 lines of code examples inline
```

**Do:**
```markdown
# Guide with references to code files

## Example 1
See: `examples/basic-usage.ts`

## Example 2
See: `examples/advanced-usage.ts`
```

---

## Context Boundaries

### Each File Should Be:

1. **Self-Contained**
   - Understandable without reading other files
   - All necessary context included
   - Clear purpose stated upfront

2. **Well-Navigated**
   - Clear table of contents
   - Links to related files
   - Clear section headers

3. **Focused**
   - One main topic
   - Related subtopics only
   - No tangents

### Navigation Patterns

**Top of file:**
```markdown
# Document Title

## Quick Links
- [Related Spec](./spec.md)
- [Design Doc](../DESIGN/architecture.md)
- [Examples](./examples.md)

## Table of Contents
1. [Section 1](#section-1)
2. [Section 2](#section-2)
```

**Bottom of file:**
```markdown
## Related Documents
- [Next: Implementation Guide](./implementation.md)
- [Previous: Overview](./overview.md)
- [See Also: Design Decisions](../DESIGN/ADRs/001-transport-choice.md)
```

---

## Token Management

### Estimating Token Usage

- **1 token ≈ 4 characters** (rough estimate)
- **Average line ≈ 50 characters**
- **500 lines ≈ 6,250 tokens**

### Strategies

1. **Summarize Long Content**
   ```markdown
   # Summary (100 lines)
   [Key points only]
   
   # Full Details
   See: [detailed-spec.md](./detailed-spec.md)
   ```

2. **Use Diagrams Instead of Text**
   ```markdown
   # Architecture
   [Diagram image]
   
   Instead of 500 lines describing architecture
   ```

3. **Extract Examples**
   ```markdown
   # Concept Explanation (200 lines)
   
   # Examples
   See: [examples/](./examples/)
   ```

4. **Create Abstractions**
   ```markdown
   # High-level overview (300 lines)
   
   # Detailed Implementation
   See: [implementation/](./implementation/)
   ```

---

## Code File Organization

### Maximum Function Size

- **Functions**: Max 50 lines
- **Classes**: Max 300 lines
- **Modules**: Max 300 lines

### When Code Files Get Too Long

1. **Extract Functions**
   ```typescript
   // Before: 500-line function
   async function processData() { ... }
   
   // After: Extract helpers
   async function processData() {
     const validated = validateInput(input);
     const transformed = transformData(validated);
     return await saveData(transformed);
   }
   ```

2. **Split Classes**
   ```typescript
   // Before: 500-line class
   class DataProcessor { ... }
   
   // After: Split responsibilities
   class DataValidator { ... }
   class DataTransformer { ... }
   class DataSaver { ... }
   ```

3. **Create Modules**
   ```typescript
   // Before: 500-line file
   // After: Split into modules
   // validators.ts
   // transformers.ts
   // savers.ts
   ```

---

## Documentation Organization

### Hierarchical Structure

```
docs/
├── README.md (overview, 200 lines)
├── SPEC/
│   ├── README.md (spec overview, 200 lines)
│   ├── api-overview.md (300 lines)
│   ├── api-details/
│   │   ├── auth.md (300 lines)
│   │   ├── endpoints.md (500 lines)
│   │   └── errors.md (200 lines)
│   └── data-models.md (500 lines)
└── DESIGN/
    ├── README.md (design overview, 200 lines)
    └── ADRs/
        ├── 001-transport.md (150 lines)
        └── 002-architecture.md (180 lines)
```

### Navigation Files

Each directory should have a README:
- Overview of contents
- Quick links to all files
- Reading order recommendations
- Max 200 lines

---

## AI Agent Guidelines

### When Processing Files

1. **Check File Size First**
   ```
   If file > limit:
     - Read summary/overview first
     - Process in chunks
     - Create summary if needed
   ```

2. **Break Large Tasks**
   ```
   Instead of: "Analyze entire 2000-line file"
   Do: "Analyze section 1, then section 2, etc."
   ```

3. **Use Summaries**
   ```
   - Read summary first
   - Then dive into specific sections
   - Create summaries for long content
   ```

4. **Respect Token Limits**
   ```
   - Monitor token usage
   - Batch operations
   - Cache results
   - Use pagination
   ```

---

## Automation

### Pre-commit Hooks

```bash
#!/bin/bash
# scripts/check-file-sizes.sh

MAX_SPEC=500
MAX_DESIGN=1000
MAX_CODE=300
MAX_DOCS=800

# Check spec files
find docs/SPEC -name "*.md" | while read file; do
  lines=$(wc -l < "$file")
  if [ $lines -gt $MAX_SPEC ]; then
    echo "❌ $file exceeds $MAX_SPEC lines ($lines lines)"
    exit 1
  fi
done

# Similar checks for other file types...
```

### CI/CD Checks

```yaml
# .github/workflows/check-file-sizes.yml
- name: Check file sizes
  run: ./scripts/check-file-sizes.sh
```

---

## Examples

### Good: Well-Sized File

```markdown
# API Authentication (280 lines)

## Overview (20 lines)
[Brief overview]

## Authentication Methods (100 lines)
[Details]

## Implementation (100 lines)
[Code examples]

## Examples (50 lines)
[Usage examples]

## Related
- [API Overview](./api-overview.md)
- [Error Handling](./api-errors.md)
```

### Bad: Too Large File

```markdown
# Everything About APIs (2500 lines)

[2000 lines of content that should be split]
```

### Good: Split Large Content

```markdown
# API Design Overview (200 lines)

## Quick Start
[Brief intro]

## Core Concepts
[High-level concepts]

## Detailed Documentation
- [Authentication](./api-authentication.md) - 300 lines
- [Endpoints](./api-endpoints.md) - 500 lines
- [Examples](./api-examples.md) - 400 lines
- [Error Handling](./api-errors.md) - 200 lines
```

---

## Review Checklist

When creating or updating files:

- [ ] File is within size limits
- [ ] File is self-contained
- [ ] Navigation is clear
- [ ] Related files are linked
- [ ] Summary exists if file is complex
- [ ] Code examples are in separate files if long

---

## Remember

**Small, focused files are easier to:**
- ✅ Understand
- ✅ Maintain
- ✅ Test
- ✅ Review
- ✅ Process (for AI agents)
- ✅ Navigate

**Large files are:**
- ❌ Hard to understand
- ❌ Hard to maintain
- ❌ Hard to review
- ❌ Hard to process
- ❌ Hard to navigate

**When in doubt, split it.**

