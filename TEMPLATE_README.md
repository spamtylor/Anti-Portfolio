# Project Foundation Template

## What This Is

This is a **comprehensive project foundation template** designed to help you start any new project with world-class structure, documentation, and workflows from day one.

## Quick Start

1. **Copy this entire directory** to your new project
2. **Rename the directory** to your project name
3. **Search and replace** `PROJECT_NAME` with your actual project name
4. **Customize** the templates:
   - Fill in SPEC.md with your project requirements
   - Fill in DESIGN.md with your architecture
   - Update README.md with your project description
   - Customize .steering/ documents for your needs
5. **Run setup**: `./scripts/setup.sh`
6. **Start building**!

## What's Included

### 📋 Core Documents
- **SPEC.md** - Project specification template
- **DESIGN.md** - Design document template
- **TODO.md** - Task management system
- **README.md** - Project overview template
- **PROJECT_FOUNDATION.md** - Complete foundation guide

### 🎯 Steering Documents (`.steering/`)
- **principles.md** - Core project principles
- **ai-agent-rules.md** - AI agent interaction guidelines
- **context-management.md** - File size limits & strategies
- **rate-limiting.md** - API management strategies
- **code-style.md** - Code style guide
- **git-workflow.md** - Git branching & workflow
- **code-review.md** - Code review guidelines
- **release-process.md** - Release & versioning process
- **security-policy.md** - Security policy template
- **logging-standards.md** - Logging standards

### 🧠 Memory System (`.memory/`)
- **context.md** - Current project context template
- **debug-log.md** - Problems & solutions log template
- **knowledge-base.md** - Knowledge base template

### 💎 Diamond Data (`.diamond/`)
- **project-state.json** - Project state tracking template

### 🤖 Automation
- **scripts/setup.sh** - Project setup script
- **scripts/validate.sh** - Validation script
- **scripts/heal.sh** - Self-healing script
- **scripts/check-file-sizes.sh** - File size enforcement

### 🔧 CI/CD Templates
- **.github/workflows/ci.yml.template** - CI workflow template
- **.github/workflows/release.yml.template** - Release workflow template
- **.github/ISSUE_TEMPLATE/** - Issue templates
- **.github/PULL_REQUEST_TEMPLATE.md** - PR template
- **.pre-commit-config.yaml.template** - Pre-commit hooks template

### 📚 Documentation Templates
- **CHANGELOG.md.template** - Changelog template
- **ONBOARDING.md** - Onboarding guide template
- **FOUNDATION_SUMMARY.md** - Quick reference guide

## Customization Guide

### 1. Project-Specific Content

**Search and replace:**
- `PROJECT_NAME` → Your project name
- `[Brief description]` → Your project description
- `[Your Name]` → Your name/team name
- `[Your License]` → Your license type

### 2. Technology Stack

Update:
- **README.md** - Prerequisites section
- **DESIGN.md** - Technology stack section
- **scripts/** - Customize for your stack
- **.github/workflows/** - Customize CI/CD for your stack

### 3. Project Structure

Customize:
- **src/** directory structure for your project
- **docs/SPEC/** - Add your specific specification files
- **PROJECT_FOUNDATION.md** - Update directory structure

### 4. File Size Limits

Adjust in:
- **.steering/context-management.md** - File size limits
- **scripts/check-file-sizes.sh** - Enforcement limits

### 5. CI/CD

Customize:
- **.github/workflows/ci.yml.template** - Your test/build process
- **.github/workflows/release.yml.template** - Your release process
- **.pre-commit-config.yaml.template** - Your linting/formatting tools

## Features

### ✅ Self-Organizing
- Clear directory structure
- Navigation guides
- Consistent naming conventions

### ✅ Self-Healing
- Automated health checks
- Validation scripts
- Auto-fix capabilities

### ✅ Knowledge Preservation
- Debug log for problems
- Knowledge base for patterns
- Decision records (ADRs)
- Context tracking

### ✅ AI Agent Ready
- Rules for AI agent interaction
- Context window management
- Rate limiting awareness

### ✅ Production Ready
- CI/CD templates
- Security policies
- Release processes
- Code review guidelines

## Philosophy

This template is built on **world-class principles**:

- 🎯 **Clarity First** - Everything immediately understandable
- 🔄 **Self-Healing** - Systems recover gracefully
- 📐 **Self-Organizing** - Structure guides naturally
- 🤝 **Shareable** - Anyone can contribute quickly
- 📚 **Documented** - Knowledge persists

## Next Steps

1. **Copy to your project**
2. **Customize templates**
3. **Run setup script**
4. **Start building!**

## Support

- **Documentation**: See PROJECT_FOUNDATION.md
- **Questions**: Check .steering/ documents
- **Issues**: Use GitHub issues

---

**Remember**: This is a template. Customize it for your needs, but keep the structure and principles that make it world-class.

