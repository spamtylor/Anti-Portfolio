# Logging Standards

## Principles

- **Structured logging** - JSON format for parsing
- **Appropriate levels** - Use correct log levels
- **No sensitive data** - Never log secrets, passwords, tokens
- **Contextual information** - Include relevant context
- **Performance aware** - Don't log in hot paths

## Log Levels

### ERROR
Critical errors that require immediate attention.
```typescript
logger.error('Database connection failed', {
  error: error.message,
  host: dbConfig.host,
  port: dbConfig.port,
  timestamp: new Date().toISOString()
});
```

### WARN
Warnings that indicate potential issues.
```typescript
logger.warn('Rate limit approaching', {
  current: requestCount,
  limit: rateLimit,
  endpoint: '/api/users'
});
```

### INFO
Informational messages about normal operation.
```typescript
logger.info('User authenticated', {
  userId: user.id,
  method: 'oauth',
  timestamp: new Date().toISOString()
});
```

### DEBUG
Detailed information for debugging.
```typescript
logger.debug('Processing request', {
  method: req.method,
  path: req.path,
  headers: sanitizedHeaders(req.headers)
});
```

## Log Format

### Structured JSON
```json
{
  "level": "error",
  "message": "Operation failed",
  "timestamp": "2025-12-21T10:00:00Z",
  "context": {
    "userId": "123",
    "operation": "createUser",
    "error": {
      "type": "ValidationError",
      "message": "Invalid email format"
    }
  },
  "metadata": {
    "requestId": "req-abc123",
    "environment": "production"
  }
}
```

### Text Format (for development)
```
[2025-12-21 10:00:00] ERROR: Operation failed
  Context: userId=123, operation=createUser
  Error: ValidationError - Invalid email format
  RequestId: req-abc123
```

## What to Log

### ✅ Log These
- **Errors**: All errors with context
- **Security events**: Authentication, authorization failures
- **Performance**: Slow operations, timeouts
- **State changes**: Important state transitions
- **External calls**: API calls, database queries (with timing)
- **User actions**: Critical user actions (with user ID)

### ❌ Never Log These
- **Secrets**: Passwords, API keys, tokens
- **PII**: Full credit card numbers, SSNs (unless required by law)
- **Large payloads**: Full request/response bodies
- **Sensitive data**: Personal information without consent
- **Stack traces in production**: Sanitize first

## Logging Best Practices

### Include Context
```typescript
// Good: Rich context
logger.error('Payment processing failed', {
  userId: user.id,
  orderId: order.id,
  amount: order.amount,
  paymentMethod: order.paymentMethod.type, // Not full card number
  error: error.message,
  requestId: req.id
});

// Bad: No context
logger.error('Payment failed');
```

### Use Appropriate Levels
```typescript
// ERROR: System can't continue
logger.error('Database connection lost');

// WARN: System can continue but issue exists
logger.warn('High memory usage', { usage: '85%' });

// INFO: Normal operation
logger.info('User logged in', { userId: user.id });

// DEBUG: Detailed debugging info
logger.debug('Query executed', { query: sanitizedQuery });
```

### Sanitize Sensitive Data
```typescript
function sanitizeLogData(data: any): any {
  const sensitive = ['password', 'token', 'apiKey', 'secret'];
  const sanitized = { ...data };
  
  for (const key of sensitive) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  }
  
  return sanitized;
}

logger.info('User data', sanitizeLogData(userData));
```

## Log Aggregation

### Centralized Logging
- Use log aggregation service (e.g., Datadog, Splunk, ELK)
- Structured format for easy parsing
- Index important fields
- Set retention policies

### Log Rotation
- Rotate logs regularly
- Compress old logs
- Archive for compliance
- Delete after retention period

## Performance Considerations

### Async Logging
```typescript
// Good: Async logging doesn't block
logger.info('User action', data); // Non-blocking

// Bad: Synchronous logging blocks
fs.writeFileSync('log.txt', logEntry); // Blocks!
```

### Conditional Logging
```typescript
// Only log in debug mode
if (process.env.LOG_LEVEL === 'debug') {
  logger.debug('Detailed info', data);
}
```

### Rate Limiting
```typescript
// Prevent log spam
const logLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60000
});

if (logLimiter.check()) {
  logger.error('Repeated error', data);
}
```

## Examples

### Good Logging
```typescript
try {
  const user = await userService.createUser(userData);
  logger.info('User created successfully', {
    userId: user.id,
    email: user.email, // Safe to log
    method: 'api',
    requestId: req.id
  });
} catch (error) {
  logger.error('Failed to create user', {
    error: error.message,
    errorType: error.constructor.name,
    userData: sanitizeLogData(userData), // Sanitized
    requestId: req.id,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
  throw error;
}
```

### Bad Logging
```typescript
// Bad: Logs password
logger.info('Creating user', { email, password });

// Bad: No context
logger.error('Error');

// Bad: Logs full stack in production
logger.error(error.stack);

// Bad: Synchronous file write
fs.writeFileSync('log.txt', logEntry);
```

## Remember

- **Structured** - Use JSON format
- **Contextual** - Include relevant information
- **Secure** - Never log secrets
- **Appropriate** - Use correct log levels
- **Performant** - Don't block on logging

