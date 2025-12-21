# Code Review Guidelines

## Purpose

Code reviews ensure:
- ✅ Code quality and maintainability
- ✅ Knowledge sharing
- ✅ Bug prevention
- ✅ Consistency across codebase
- ✅ Security best practices

## Review Process

### For Authors

**Before Submitting PR:**
- [ ] Code follows style guidelines
- [ ] All tests passing
- [ ] Documentation updated
- [ ] File sizes within limits
- [ ] No secrets committed
- [ ] Self-review completed

**PR Description Should Include:**
- What changed and why
- How to test
- Screenshots (if UI changes)
- Breaking changes (if any)
- Related issues/PRs

### For Reviewers

**Review Checklist:**
- [ ] Code is correct and works as intended
- [ ] Code follows style guidelines
- [ ] Tests are adequate
- [ ] Documentation is updated
- [ ] No security issues
- [ ] Performance considerations addressed
- [ ] Error handling is appropriate
- [ ] Code is maintainable

**Review Timeline:**
- **First review**: Within 24 hours
- **Follow-up reviews**: Within 12 hours
- **Urgent fixes**: Within 4 hours

## Review Focus Areas

### Functionality
- ✅ Does it work as intended?
- ✅ Edge cases handled?
- ✅ Error cases handled?
- ✅ Performance acceptable?

### Code Quality
- ✅ Readable and understandable?
- ✅ Follows project patterns?
- ✅ No code duplication?
- ✅ Properly abstracted?

### Testing
- ✅ Adequate test coverage?
- ✅ Tests are meaningful?
- ✅ Edge cases tested?
- ✅ Integration tests if needed?

### Security
- ✅ No secrets in code?
- ✅ Input validation?
- ✅ Authentication/authorization?
- ✅ SQL injection prevention?
- ✅ XSS prevention?

### Documentation
- ✅ Code is self-documenting?
- ✅ Complex logic commented?
- ✅ Public APIs documented?
- ✅ README/docs updated?

## Review Comments

### Types of Comments

**Must Fix** (Blocking):
- Critical bugs
- Security issues
- Breaking changes
- Style violations

**Should Fix** (Non-blocking):
- Code improvements
- Better naming
- Performance optimizations
- Documentation improvements

**Nice to Have** (Optional):
- Minor suggestions
- Future improvements
- Alternative approaches

### Comment Format

```markdown
**Type**: Must Fix / Should Fix / Nice to Have

**Issue**: [Clear description]

**Suggestion**: [How to fix or improve]

**Example**:
```typescript
// Instead of this
const x = data.filter(...).map(...);

// Consider this for better readability
const filtered = data.filter(...);
const mapped = filtered.map(...);
```
```

## Approval Criteria

### Can Approve When:
- ✅ All "Must Fix" items addressed
- ✅ Code is correct and tested
- ✅ Documentation updated
- ✅ No security concerns
- ✅ Follows project standards

### Should Request Changes When:
- ❌ Critical bugs present
- ❌ Security issues found
- ❌ Tests missing or inadequate
- ❌ Documentation incomplete
- ❌ Style guidelines violated

## Best Practices

### For Authors
- ✅ **Be open to feedback** - Reviews are learning opportunities
- ✅ **Respond promptly** - Address comments within 24 hours
- ✅ **Ask questions** - If feedback is unclear
- ✅ **Explain decisions** - If you disagree, explain why
- ✅ **Keep PRs focused** - One feature/fix per PR
- ✅ **Keep PRs small** - < 500 lines changed ideally

### For Reviewers
- ✅ **Be constructive** - Focus on code, not person
- ✅ **Be specific** - Point to exact lines/issues
- ✅ **Suggest solutions** - Don't just point out problems
- ✅ **Praise good work** - Acknowledge good solutions
- ✅ **Review promptly** - Don't let PRs sit
- ✅ **Ask questions** - If something is unclear

## Common Issues

### Too Large PR
**Problem**: PR has 2000+ lines changed
**Solution**: Split into smaller PRs
**Prevention**: Create feature branches early

### Missing Tests
**Problem**: New code has no tests
**Solution**: Request tests before approval
**Prevention**: Set up test requirements in CI

### Style Violations
**Problem**: Code doesn't follow style guide
**Solution**: Use linter/formatter
**Prevention**: Pre-commit hooks

### Security Issues
**Problem**: Secrets or vulnerabilities
**Solution**: Immediate fix required
**Prevention**: Security scanning in CI

## Review Tools

### Automated Checks
- Linting (ESLint, etc.)
- Formatting (Prettier, etc.)
- Tests (Jest, etc.)
- Security (npm audit, etc.)
- File size checks

### Manual Review
- Code logic
- Architecture decisions
- Business logic correctness
- User experience (if applicable)

## Remember

**Code review is collaboration, not criticism.**

- ✅ Focus on code quality
- ✅ Be respectful and constructive
- ✅ Learn from each review
- ✅ Share knowledge
- ✅ Improve together

