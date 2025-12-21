# Git Workflow & Branching Strategy

## Branching Strategy

### Main Branches
- **main/master** - Production-ready code
- **develop** - Integration branch for features

### Supporting Branches
- **feature/** - New features
- **bugfix/** - Bug fixes
- **hotfix/** - Urgent production fixes
- **release/** - Release preparation

## Workflow

### Starting New Work

1. **Create feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Work on feature**
   - Make commits following commit conventions
   - Keep commits focused and atomic
   - Update documentation as you go

3. **Before pushing**
   ```bash
   # Run validation
   ./scripts/validate.sh
   
   # Run self-healing
   ./scripts/heal.sh
   
   # Check file sizes
   ./scripts/check-file-sizes.sh
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

### Commit Conventions

**Format**: `type(scope): subject`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples**:
```
feat(api): add user authentication endpoint
fix(server): resolve memory leak in connection pool
docs(readme): update installation instructions
refactor(utils): extract common validation logic
test(api): add integration tests for auth flow
```

### Pull Request Process

1. **Create PR**
   - Use PR template
   - Link related issues
   - Add reviewers

2. **Code Review**
   - Address review comments
   - Update PR as needed
   - Ensure all checks pass

3. **Merge**
   - Squash and merge (preferred)
   - Or merge commit
   - Delete feature branch after merge

### Release Process

1. **Create release branch**
   ```bash
   git checkout develop
   git checkout -b release/v1.2.0
   ```

2. **Prepare release**
   - Update version numbers
   - Update CHANGELOG.md
   - Run full test suite
   - Update documentation

3. **Merge to main**
   ```bash
   git checkout main
   git merge release/v1.2.0
   git tag v1.2.0
   git push origin main --tags
   ```

4. **Merge back to develop**
   ```bash
   git checkout develop
   git merge release/v1.2.0
   git push origin develop
   ```

## Best Practices

### Commit Messages
- ✅ Write clear, descriptive messages
- ✅ Use imperative mood ("Add feature" not "Added feature")
- ✅ Keep first line under 50 characters
- ✅ Add detailed description if needed
- ❌ Don't commit broken code
- ❌ Don't commit large files
- ❌ Don't commit secrets

### Branch Naming
- ✅ `feature/user-authentication`
- ✅ `bugfix/memory-leak`
- ✅ `hotfix/critical-security-patch`
- ✅ `release/v1.2.0`
- ❌ `my-feature`
- ❌ `fix`
- ❌ `update`

### PR Best Practices
- ✅ Keep PRs focused (one feature/fix)
- ✅ Keep PRs small (< 500 lines changed)
- ✅ Write clear descriptions
- ✅ Link related issues
- ✅ Request specific reviewers
- ✅ Respond to review comments promptly

## Emergency Procedures

### Hotfix Process
```bash
git checkout main
git checkout -b hotfix/critical-issue
# Fix the issue
git commit -m "fix: critical security patch"
git checkout main
git merge hotfix/critical-issue
git tag v1.1.1
git push origin main --tags
# Merge back to develop
```

### Rollback Process
```bash
# Revert a commit
git revert <commit-hash>

# Revert a merge
git revert -m 1 <merge-commit-hash>

# Tag the rollback
git tag v1.2.1-rollback
```

## Tools

### Pre-commit Hooks
Automatically run:
- Linting
- File size checks
- Tests
- Documentation validation

### Git Hooks
- **pre-commit**: Run validation
- **commit-msg**: Validate commit message format
- **pre-push**: Run full test suite

## Remember

- **Commit often** - Small, focused commits
- **Write clear messages** - Future you will thank you
- **Review before pushing** - Catch issues early
- **Keep branches up to date** - Regular rebase/merge
- **Delete merged branches** - Keep repository clean

