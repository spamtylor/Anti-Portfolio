# Rate Limiting & API Management

## Philosophy

**Always be mindful of rate limits, token usage, and API costs.**

We must design systems that respect limits and handle them gracefully.

---

## Awareness Areas

### 1. API Rate Limits

**Always know:**
- Requests per minute/hour/day
- Concurrent request limits
- Burst limits
- Reset periods

**Document in:**
- `docs/SPEC/api-design.md`
- `.diamond/project-state.json`
- `.memory/debug-log.md` (if issues occur)

### 2. Token Limits

**Always consider:**
- Tokens per request
- Total context window size
- Token costs
- Response token limits

**Strategies:**
- Summarize long content
- Use pagination
- Cache responses
- Batch operations

### 3. Cost Management

**Track:**
- Cost per operation
- Daily/monthly budgets
- Cost per user/request
- Optimization opportunities

**Monitor:**
- `.diamond/project-state.json` - Current usage
- `.memory/debug-log.md` - Cost-related issues

---

## Implementation Strategies

### 1. Batching

**Combine multiple operations:**

```typescript
// Bad: Multiple sequential calls
const result1 = await api.call1();
const result2 = await api.call2();
const result3 = await api.call3();

// Good: Batch operations
const [result1, result2, result3] = await Promise.all([
  api.call1(),
  api.call2(),
  api.call3()
]);
```

**Benefits:**
- Reduces number of requests
- Faster overall execution
- Better resource utilization

### 2. Caching

**Cache expensive operations:**

```typescript
class RateLimitedAPI {
  private cache = new Map<string, { data: any; expires: number }>();
  private ttl = 3600000; // 1 hour

  async getData(key: string) {
    // Check cache first
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.data;
    }

    // Fetch if not cached or expired
    const data = await this.fetchFromAPI(key);
    this.cache.set(key, {
      data,
      expires: Date.now() + this.ttl
    });
    return data;
  }
}
```

**Cache Strategies:**
- **Time-based**: Cache for X minutes
- **Event-based**: Invalidate on updates
- **Size-based**: Limit cache size
- **LRU**: Least recently used eviction

### 3. Exponential Backoff

**Handle rate limit errors gracefully:**

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429) { // Rate limited
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        console.log(`Rate limited, retrying in ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}
```

**Backoff Patterns:**
- **Exponential**: 1s, 2s, 4s, 8s...
- **Linear**: 1s, 2s, 3s, 4s...
- **Jitter**: Add randomness to avoid thundering herd

### 4. Request Queuing

**Queue requests to respect limits:**

```typescript
class RateLimitedQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private maxConcurrent = 5;
  private current = 0;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.current >= this.maxConcurrent) {
      return;
    }

    this.processing = true;
    while (this.queue.length > 0 && this.current < this.maxConcurrent) {
      this.current++;
      const task = this.queue.shift();
      task!().finally(() => {
        this.current--;
        this.process();
      });
    }
    this.processing = false;
  }
}
```

### 5. Token Bucket Algorithm

**Control request rate:**

```typescript
class TokenBucket {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number; // tokens per second
  private lastRefill: number;

  constructor(maxTokens: number, refillRate: number) {
    this.tokens = maxTokens;
    this.maxTokens = maxTokens;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  async consume(tokens = 1): Promise<void> {
    this.refill();
    
    if (this.tokens < tokens) {
      const waitTime = (tokens - this.tokens) / this.refillRate * 1000;
      await sleep(waitTime);
      this.refill();
    }

    this.tokens -= tokens;
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.maxTokens,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }
}
```

---

## Monitoring

### Track Usage

```typescript
class UsageTracker {
  private metrics = {
    requests: 0,
    tokens: 0,
    errors: 0,
    rateLimitHits: 0,
    startTime: Date.now()
  };

  recordRequest(tokens: number) {
    this.metrics.requests++;
    this.metrics.tokens += tokens;
  }

  recordRateLimit() {
    this.metrics.rateLimitHits++;
  }

  getStats() {
    const elapsed = (Date.now() - this.metrics.startTime) / 1000;
    return {
      ...this.metrics,
      requestsPerSecond: this.metrics.requests / elapsed,
      tokensPerSecond: this.metrics.tokens / elapsed
    };
  }
}
```

### Log to .diamond/project-state.json

```json
{
  "apiUsage": {
    "requests": 1250,
    "tokens": 50000,
    "rateLimitHits": 3,
    "lastReset": "2025-12-21T12:00:00Z",
    "limits": {
      "requestsPerMinute": 60,
      "tokensPerRequest": 4000,
      "dailyLimit": 100000
    }
  }
}
```

---

## Error Handling

### Rate Limit Errors

```typescript
try {
  await api.call();
} catch (error) {
  if (error.status === 429) {
    // Rate limited
    const retryAfter = error.headers['retry-after'] || 60;
    console.log(`Rate limited. Retry after ${retryAfter} seconds`);
    
    // Log to debug log
    logToDebugLog({
      problem: "Rate limit exceeded",
      solution: `Wait ${retryAfter} seconds before retry`,
      prevention: "Implement request queuing"
    });
    
    await sleep(retryAfter * 1000);
    return await api.call(); // Retry
  }
  throw error;
}
```

### Quota Exceeded

```typescript
try {
  await api.call();
} catch (error) {
  if (error.status === 403 && error.message.includes("quota")) {
    // Quota exceeded
    console.error("Daily quota exceeded");
    
    // Log to debug log
    logToDebugLog({
      problem: "API quota exceeded",
      solution: "Wait for quota reset or upgrade plan",
      prevention: "Monitor usage and implement caching"
    });
    
    // Notify user
    throw new Error("API quota exceeded. Please try again tomorrow.");
  }
  throw error;
}
```

---

## Best Practices

### 1. Always Check Limits First

```typescript
async function makeRequest() {
  // Check if we're near limit
  if (usageTracker.isNearLimit()) {
    await usageTracker.waitForReset();
  }
  
  return await api.call();
}
```

### 2. Implement Circuit Breaker

```typescript
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private threshold = 5;

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      throw new Error("Circuit breaker is open");
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'open';
      setTimeout(() => {
        this.state = 'half-open';
      }, 60000); // Try again after 1 minute
    }
  }
}
```

### 3. Use Request Deduplication

```typescript
class RequestDeduplicator {
  private pending = new Map<string, Promise<any>>();

  async request<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (this.pending.has(key)) {
      return this.pending.get(key)!;
    }

    const promise = fn().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }
}
```

---

## Documentation Requirements

### Document Limits

**In `docs/SPEC/api-design.md`:**
```markdown
## Rate Limits

- **Requests**: 60 per minute
- **Burst**: 10 concurrent requests
- **Daily Limit**: 10,000 requests
- **Token Limit**: 4,000 tokens per request
- **Reset**: Daily at midnight UTC
```

### Document Strategies

**In `docs/DESIGN/patterns.md`:**
```markdown
## Rate Limiting Patterns

### Token Bucket
[Description and implementation]

### Exponential Backoff
[Description and implementation]

### Request Queuing
[Description and implementation]
```

---

## Remember

**Rate limits are real constraints.**
- ✅ Always check limits before making requests
- ✅ Implement backoff strategies
- ✅ Cache aggressively
- ✅ Batch operations
- ✅ Monitor usage
- ✅ Document limits and strategies

**Costs matter.**
- ✅ Track token usage
- ✅ Optimize requests
- ✅ Cache results
- ✅ Monitor spending

**Failures happen.**
- ✅ Handle rate limit errors gracefully
- ✅ Log to debug-log.md
- ✅ Implement retry logic
- ✅ Provide user feedback

