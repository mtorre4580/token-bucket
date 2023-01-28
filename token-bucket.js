class TokenBucket {
  // Maximum tokens for each bucket
  maxTokens;
  // The miliseconds to refill the bucket
  rateInMs;
  // The stamp of the last fill
  lastRefill;
  // The current tokens available to use
  currentTokens;

  constructor(maxTokens, rateInMs) {
    this.maxTokens = maxTokens;
    this.rateInMs = rateInMs;
    this.lastRefill = Math.floor(Date.now());
    this.currentTokens = maxTokens;
  }

  /**
   * Check if has tokens to handle the request
   * @returns boolean
   */
  allow() {
    this.refill();
    if (this.currentTokens > 0) {
      this.currentTokens--;
      return true;
    }
    return false;
  }

  /**
   * Refill the current bucket with the tokens available
   */
  refill() {
    const now = Math.floor(Date.now());
    const rate = (now - this.lastRefill) / this.rateInMs;
    this.currentTokens = Math.min(
      this.maxTokens,
      this.currentTokens + Math.floor(rate * this.maxTokens)
    );
    this.lastRefill = now;
  }
}

module.exports = TokenBucket;
