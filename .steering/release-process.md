# Release Process

## Versioning Strategy

### Semantic Versioning
Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible

### Pre-release Versions
- **Alpha**: `1.0.0-alpha.1`
- **Beta**: `1.0.0-beta.1`
- **RC**: `1.0.0-rc.1`

## Release Checklist

### Pre-Release

- [ ] All tests passing
- [ ] Code coverage meets threshold (>80%)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version numbers updated
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Breaking changes documented
- [ ] Migration guide created (if needed)
- [ ] Release notes prepared

### Release Steps

1. **Create release branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.2.0
   ```

2. **Update version**
   ```bash
   # Update package.json, version files, etc.
   npm version 1.2.0
   ```

3. **Update CHANGELOG.md**
   ```markdown
   ## [1.2.0] - 2025-12-21
   
   ### Added
   - New feature X
   - New feature Y
   
   ### Changed
   - Improved performance of Z
   
   ### Fixed
   - Bug fix A
   - Bug fix B
   ```

4. **Final checks**
   ```bash
   # Run full test suite
   npm test
   
   # Run validation
   ./scripts/validate.sh
   
   # Check file sizes
   ./scripts/check-file-sizes.sh
   
   # Security audit
   npm audit
   ```

5. **Merge to main**
   ```bash
   git checkout main
   git merge release/v1.2.0
   git tag v1.2.0
   git push origin main --tags
   ```

6. **Merge back to develop**
   ```bash
   git checkout develop
   git merge release/v1.2.0
   git push origin develop
   ```

7. **Create GitHub Release**
   - Use GitHub UI or automation
   - Include release notes from CHANGELOG
   - Attach binaries if applicable

### Post-Release

- [ ] Verify release on production
- [ ] Monitor for issues
- [ ] Update documentation site
- [ ] Announce release (if applicable)
- [ ] Update project state
- [ ] Archive release branch

## Hotfix Process

For urgent production fixes:

1. **Create hotfix branch from main**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-issue
   ```

2. **Fix the issue**
   - Make minimal changes
   - Add tests
   - Update CHANGELOG

3. **Release hotfix**
   ```bash
   npm version patch  # e.g., 1.2.0 -> 1.2.1
   git checkout main
   git merge hotfix/critical-issue
   git tag v1.2.1
   git push origin main --tags
   ```

4. **Merge to develop**
   ```bash
   git checkout develop
   git merge hotfix/critical-issue
   git push origin develop
   ```

## Rollback Procedure

### If Release Fails

1. **Identify the issue**
   - Check error logs
   - Review recent changes
   - Document in debug-log.md

2. **Revert the release**
   ```bash
   git revert <release-commit>
   git tag v1.2.1-rollback
   git push origin main --tags
   ```

3. **Communicate**
   - Update users/team
   - Document in CHANGELOG
   - Create issue for investigation

## CHANGELOG Format

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features

### Changed
- Changes to existing features

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes

## [1.2.0] - 2025-12-21

### Added
- Feature X
- Feature Y

### Changed
- Improved performance

### Fixed
- Bug fix A
```

## Release Notes Template

```markdown
# Release v1.2.0

## Highlights
- Major feature X
- Performance improvements
- Bug fixes

## New Features
- Feature 1: Description
- Feature 2: Description

## Improvements
- Improvement 1
- Improvement 2

## Bug Fixes
- Fixed issue with X
- Resolved problem with Y

## Breaking Changes
- Change 1: Migration guide [link]
- Change 2: Migration guide [link]

## Upgrade Guide
[Step-by-step upgrade instructions]

## Full Changelog
See [CHANGELOG.md](./CHANGELOG.md) for complete list of changes.
```

## Remember

- **Test thoroughly** before release
- **Document everything** in CHANGELOG
- **Communicate** breaking changes
- **Monitor** after release
- **Be ready** to rollback if needed

