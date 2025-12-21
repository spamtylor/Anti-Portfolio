# Template Usage Guide

## How to Use This Template

### Step 1: Copy to Your Project

```bash
# Copy entire directory to your new project
cp -r /path/to/this/template /path/to/your/new-project
cd /path/to/your/new-project
```

### Step 2: Rename and Replace

**Find and replace:**
- `PROJECT_NAME` → Your actual project name
- `[Brief description]` → Your project description
- `[Your Name]` → Your name/team
- `[Your License]` → Your license

**Quick script:**
```bash
# Replace PROJECT_NAME with your project name
find . -type f -name "*.md" -o -name "*.json" -o -name "*.sh" | \
  xargs sed -i '' 's/PROJECT_NAME/YourProjectName/g'
```

### Step 3: Customize Core Documents

1. **SPEC.md**
   - Fill in project requirements
   - Define success criteria
   - List constraints

2. **DESIGN.md**
   - Choose technology stack
   - Define architecture
   - Document design principles

3. **README.md**
   - Write project description
   - Add key features
   - Update prerequisites
   - Add project-specific resources

4. **TODO.md**
   - Add initial tasks
   - Set priorities
   - Assign owners

### Step 4: Customize Structure

**Update PROJECT_FOUNDATION.md:**
- Modify `src/` directory structure
- Add project-specific directories
- Update file examples

**Update directory structure:**
```bash
# Create your project-specific directories
mkdir -p src/[your-components]
mkdir -p docs/SPEC/[your-specs]
```

### Step 5: Customize Technology Stack

**Update CI/CD:**
- `.github/workflows/ci.yml.template` → Rename to `ci.yml`
- Customize for your build/test tools
- Update Node.js/Python versions

**Update scripts:**
- `scripts/setup.sh` - Customize for your stack
- `scripts/validate.sh` - Add your validation rules
- `scripts/heal.sh` - Add your health checks

**Update dependencies:**
- Create `package.json` or `requirements.txt`
- Update `.diamond/dependencies.json`

### Step 6: Customize Steering Documents

**Review and customize:**
- `.steering/code-style.md` - Your coding standards
- `.steering/git-workflow.md` - Your branching strategy
- `.steering/release-process.md` - Your release process
- `.steering/security-policy.md` - Your security requirements

### Step 7: Initialize

```bash
# Run setup
./scripts/setup.sh

# Validate
./scripts/validate.sh

# Start development
# ... your development commands
```

## What to Keep

### ✅ Keep These
- Directory structure (`.steering/`, `.memory/`, `.diamond/`)
- File size limits (adjust if needed)
- Documentation structure
- Principles and guidelines
- Automation scripts (customize, don't remove)

### 🔄 Customize These
- Technology stack
- Project structure (`src/` layout)
- CI/CD workflows
- Code style (language-specific)
- Release process (if different)

### ❌ Remove These (If Not Needed)
- Unused steering documents
- Unused templates
- Technology-specific examples (if different stack)

## Template Features

### Self-Organizing
- Clear structure guides contributors
- Navigation is intuitive
- Files are easy to find

### Self-Healing
- Validation scripts catch issues
- Health checks monitor status
- Auto-fix scripts resolve common problems

### Knowledge Preservation
- Debug log tracks problems
- Knowledge base accumulates patterns
- ADRs document decisions
- Context stays current

### AI Agent Ready
- Rules for AI interaction
- Context management
- Rate limiting awareness

## Customization Examples

### Example 1: Web Application

**Structure:**
```
src/
├── components/    # React/Vue components
├── pages/         # Page components
├── api/           # API routes
├── utils/         # Utilities
└── styles/        # CSS/styling
```

**CI/CD:**
- Build: `npm run build`
- Test: `npm test`
- Deploy: Vercel/Netlify

### Example 2: API Server

**Structure:**
```
src/
├── routes/        # API routes
├── controllers/   # Request handlers
├── models/        # Data models
├── middleware/    # Middleware
└── services/      # Business logic
```

**CI/CD:**
- Build: Docker build
- Test: `pytest` or `jest`
- Deploy: Kubernetes/Docker

### Example 3: Library/Package

**Structure:**
```
src/
├── core/          # Core functionality
├── utils/         # Utilities
└── types/         # Type definitions
```

**CI/CD:**
- Build: `npm run build` or `python setup.py build`
- Test: Unit tests
- Publish: npm/PyPI

## Tips

1. **Start Simple** - Don't over-customize initially
2. **Iterate** - Add complexity as needed
3. **Document** - Keep documentation updated
4. **Automate** - Use scripts for repetitive tasks
5. **Review** - Regularly review and improve

## Common Customizations

### Adding New Steering Documents
1. Create file in `.steering/`
2. Follow existing format
3. Link from PROJECT_FOUNDATION.md
4. Update navigation

### Adding New Scripts
1. Create in `scripts/`
2. Make executable: `chmod +x scripts/new-script.sh`
3. Document in PROJECT_FOUNDATION.md
4. Add to CI/CD if needed

### Adding New Templates
1. Create template file
2. Add `.template` extension
3. Document usage
4. Include in setup script

## Remember

This template is a **starting point**, not a constraint. Customize it to fit your project's needs while maintaining the principles that make it world-class.

---

**Questions?** Check PROJECT_FOUNDATION.md or the .steering/ documents for detailed guidance.

