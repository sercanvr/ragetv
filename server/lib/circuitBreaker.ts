/**
 * Lightweight Circuit Breaker for external API resiliency.
 * Protects against upstream rate limits and platform downtime.
 */

interface CircuitBreakerOptions {
  failureThreshold?: number; // Number of failures before tripping
  cooldownPeriodMs?: number; // Wait time before retrying upstream (default 30s)
}

export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private isOpen = false;

  constructor(private options: CircuitBreakerOptions = {}) {
    this.options.failureThreshold = options.failureThreshold || 3;
    this.options.cooldownPeriodMs = options.cooldownPeriodMs || 30_000;
  }

  public canExecute(): boolean {
    if (!this.isOpen) return true;
    const now = Date.now();
    if (now - this.lastFailureTime > (this.options.cooldownPeriodMs || 30_000)) {
      // Cooldown expired, enter half-open state
      return true;
    }
    return false;
  }

  public recordSuccess(): void {
    this.failureCount = 0;
    this.isOpen = false;
  }

  public recordFailure(): void {
    this.failureCount += 1;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= (this.options.failureThreshold || 3)) {
      this.isOpen = true;
    }
  }

  public getState(): { isOpen: boolean; failureCount: number } {
    return {
      isOpen: this.isOpen,
      failureCount: this.failureCount,
    };
  }
}
