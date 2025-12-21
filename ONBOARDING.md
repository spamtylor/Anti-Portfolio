# Onboarding Guide

## Welcome! 👋

This guide will get you up to speed on the project foundation in **15 minutes**.

---

## 🎯 What This Project Is

[Brief description - fill in based on your specific project]

---

## 📚 Essential Reading (15 minutes)

### 1. Start Here (2 min)
- **README.md** - Project overview
- **FOUNDATION_SUMMARY.md** - Quick reference

### 2. Understand What (5 min)
- **SPEC.md** - What we're building
- **TODO.md** - What needs to be done

### 3. Understand How (5 min)
- **DESIGN.md** - How we're building it
- **.steering/principles.md** - Core principles

### 4. Get Context (3 min)
- **.memory/context.md** - Current project state
- **.steering/ai-agent-rules.md** - If you're an AI agent

---

## 🗺️ Navigation Guide

### I want to...

**...understand what we're building**
→ Read `SPEC.md`

**...understand how we're building it**
→ Read `DESIGN.md`

**...see what needs to be done**
→ Check `TODO.md`

**...get current project context**
→ Read `.memory/context.md`

**...find a solution to a problem**
→ Search `.memory/debug-log.md`

**...understand a design decision**
→ Check `docs/DESIGN/ADRs/`

**...know the project principles**
→ Read `.steering/principles.md`

**...check project health**
→ Check `.diamond/project-state.json`

---

## 🚀 Quick Start

### For Developers

1. **Setup**
   ```bash
   ./scripts/setup.sh
   ```

2. **Validate**
   ```bash
   ./scripts/validate.sh
   ```

3. **Pick a task**
   - Check `TODO.md`
   - Find a task marked "Not Started"
   - Update status to "In Progress"

4. **Start coding**
   - Follow file size limits (see `.steering/context-management.md`)
   - Document as you go
   - Run tests frequently

5. **Before committing**
   ```bash
   ./scripts/heal.sh
   ./scripts/validate.sh
   ```

### For AI Agents

1. **Read the rules**
   - `.steering/ai-agent-rules.md` - Complete guidelines
   - Key rule: Say "I don't know" when uncertain

2. **Check context**
   - `.memory/context.md` - Current state
   - `.memory/debug-log.md` - Past problems

3. **Respect limits**
   - File size limits (see `.steering/context-management.md`)
   - Rate limits (see `.steering/rate-limiting.md`)

4. **Document problems**
   - Add to `.memory/debug-log.md` when issues occur
   - Update `.memory/knowledge-base.md` with learnings

---

## 📋 Key Rules (TL;DR)

### File Sizes
- Spec: 500 lines max
- Design: 1000 lines max
- Code: 300 lines max
- Docs: 800 lines max

### AI Agents
- ✅ Say "I don't know" when uncertain
- ✅ Document problems in debug-log.md
- ✅ Respect context window limits
- ✅ Be mindful of rate limits

### Documentation
- ✅ Document as you go
- ✅ Update when code changes
- ✅ Log problems immediately
- ✅ Create ADRs for major decisions

---

## 🎓 Learning Path

### Day 1: Foundation
- [ ] Read README.md
- [ ] Read PROJECT_FOUNDATION.md
- [ ] Review SPEC.md and DESIGN.md
- [ ] Check TODO.md

### Day 2: Deep Dive
- [ ] Read all .steering/ documents
- [ ] Review .memory/ files
- [ ] Check existing ADRs
- [ ] Review code structure

### Day 3: Contribution
- [ ] Pick a task from TODO.md
- [ ] Set up development environment
- [ ] Make first contribution
- [ ] Document learnings

---

## ❓ FAQ

### Q: Where do I start?
**A**: Read README.md, then SPEC.md, then DESIGN.md, then TODO.md

### Q: How do I know what to work on?
**A**: Check TODO.md for tasks marked "Not Started" or "Next Up"

### Q: What if I don't know how to do something?
**A**: 
- Say "I don't know"
- Check debug-log.md for similar problems
- Check knowledge-base.md for patterns
- Propose an investigation path

### Q: How do I document a problem?
**A**: Add an entry to `.memory/debug-log.md` following the format there

### Q: How do I make a design decision?
**A**: Create an ADR in `docs/DESIGN/ADRs/` following the ADR template

### Q: What if a file is too long?
**A**: Split it! See `.steering/context-management.md` for strategies

### Q: How do I check project health?
**A**: Run `./scripts/validate.sh` or check `.diamond/project-state.json`

---

## 🆘 Getting Help

1. **Check the docs** - Most answers are documented
2. **Search debug-log.md** - Find similar problems
3. **Check knowledge-base.md** - Find patterns
4. **Review ADRs** - Understand past decisions
5. **Ask questions** - It's okay to not know!

---

## ✅ Onboarding Checklist

- [ ] Read README.md
- [ ] Read FOUNDATION_SUMMARY.md
- [ ] Review SPEC.md
- [ ] Review DESIGN.md
- [ ] Check TODO.md
- [ ] Read .steering/principles.md
- [ ] Read .steering/ai-agent-rules.md (if AI agent)
- [ ] Check .memory/context.md
- [ ] Run ./scripts/setup.sh
- [ ] Run ./scripts/validate.sh
- [ ] Pick a task from TODO.md
- [ ] Make first contribution!

---

## 🎉 You're Ready!

You now understand:
- ✅ What we're building (SPEC)
- ✅ How we're building it (DESIGN)
- ✅ What needs to be done (TODO)
- ✅ Project principles and rules
- ✅ How to navigate the project
- ✅ How to contribute

**Welcome to the project! Let's build something world-class! 🚀**

