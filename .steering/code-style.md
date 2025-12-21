# Code Style Guide

## General Principles

- **Readability** over cleverness
- **Consistency** across the codebase
- **Simplicity** over complexity
- **Self-documenting** code

## Naming Conventions

### Files
- **JavaScript/TypeScript**: `kebab-case.js` or `PascalCase.tsx`
- **Python**: `snake_case.py`
- **Documentation**: `kebab-case.md`

### Variables & Functions
- **JavaScript/TypeScript**: `camelCase`
- **Python**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`

### Classes
- **All languages**: `PascalCase`

### Examples
```typescript
// Good
const userName = "john";
function getUserData() {}
class UserManager {}
const MAX_RETRIES = 3;

// Bad
const user_name = "john";
function GetUserData() {}
class user_manager {}
```

## Code Organization

### File Structure
```typescript
// 1. Imports (external first, then internal)
import express from 'express';
import { UserService } from './services/user';

// 2. Constants
const DEFAULT_TIMEOUT = 5000;

// 3. Types/Interfaces
interface UserConfig {
  name: string;
  email: string;
}

// 4. Functions/Classes
export class UserController {
  // ...
}

// 5. Exports
export default UserController;
```

### Function Guidelines
- **Max 50 lines** per function
- **Single responsibility** - One function, one purpose
- **Clear naming** - Function name describes what it does
- **Documentation** - JSDoc/docstrings for public functions

### Class Guidelines
- **Max 300 lines** per class
- **Single responsibility** - One class, one purpose
- **Clear public API** - Well-defined interface

## Formatting

### Indentation
- **2 spaces** for JavaScript/TypeScript/JSON
- **4 spaces** for Python
- **Consistent** across file

### Line Length
- **Max 100 characters** (soft limit)
- **Max 120 characters** (hard limit)
- Break long lines logically

### Spacing
```typescript
// Good: Consistent spacing
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Bad: Inconsistent spacing
function calculateTotal(items:Item[]):number{
  return items.reduce((sum,item)=>sum+item.price,0);
}
```

## Comments

### When to Comment
- ✅ **Why**, not what (code should be self-explanatory)
- ✅ Complex algorithms
- ✅ Business logic decisions
- ✅ Workarounds for known issues
- ✅ Public API documentation

### Comment Style
```typescript
/**
 * Calculates the total price including tax.
 * 
 * @param items - Array of items to calculate total for
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including tax
 */
function calculateTotalWithTax(items: Item[], taxRate: number): number {
  // Apply tax to each item (business requirement: tax per item, not total)
  return items.reduce((sum, item) => {
    return sum + (item.price * (1 + taxRate));
  }, 0);
}
```

## Error Handling

### Always Handle Errors
```typescript
// Good: Explicit error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new OperationError('Failed to perform operation', { cause: error });
}

// Bad: Silent failures
try {
  await riskyOperation();
} catch (error) {
  // Ignored
}
```

### Error Types
- Use specific error types
- Include context
- Provide actionable messages

## Testing

### Test Organization
```typescript
describe('UserService', () => {
  describe('getUser', () => {
    it('should return user when found', async () => {
      // Test implementation
    });
    
    it('should throw error when user not found', async () => {
      // Test implementation
    });
  });
});
```

### Test Naming
- **Descriptive**: "should return user when found"
- **Specific**: "should throw NotFoundError when user ID is invalid"
- **Action-oriented**: Use "should" or "when"

## Documentation

### Code Documentation
- **Public APIs**: Always documented
- **Complex logic**: Always documented
- **Type definitions**: Documented interfaces

### Documentation Format
```typescript
/**
 * User service for managing user operations.
 */
export class UserService {
  /**
   * Retrieves a user by ID.
   * 
   * @param userId - The unique identifier of the user
   * @returns Promise resolving to User object
   * @throws {NotFoundError} When user is not found
   * @throws {ValidationError} When userId is invalid
   */
  async getUser(userId: string): Promise<User> {
    // Implementation
  }
}
```

## Linting & Formatting

### Tools
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Black** - Python formatting
- **Pre-commit hooks** - Automatic checks

### Configuration
- Linter config in `.eslintrc.js` or `eslint.config.js`
- Formatter config in `.prettierrc`
- Pre-commit config in `.pre-commit-config.yaml`

## Examples

### Good Code
```typescript
/**
 * Validates user email address.
 * 
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage
if (!isValidEmail(userInput)) {
  throw new ValidationError('Invalid email address');
}
```

### Bad Code
```typescript
// Unclear function name
function check(e) {
  // Magic regex without explanation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

// No error handling
const result = check(input);
```

## Remember

- **Consistency** is key
- **Readability** matters most
- **Document** public APIs
- **Test** your code
- **Refactor** when needed

