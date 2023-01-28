const TokenBucket = require("./token-bucket");

describe("TokenBucket", () => {
  const maxTokens = 3;
  const rateInMs = 1000;

  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should pass 3 calls in 1 second", () => {
    const tokenBucket = new TokenBucket(maxTokens, rateInMs);

    for (let i = 0; i < 3; i++) {
      expect(tokenBucket.allow()).toBeTruthy();
    }

    expect(tokenBucket.allow()).toBeFalsy();
  });

  test("should pass 3 calls in 1 second and refill after", () => {
    const tokenBucket = new TokenBucket(maxTokens, rateInMs);

    for (let i = 0; i < 3; i++) {
      expect(tokenBucket.allow()).toBeTruthy();
    }

    expect(tokenBucket.allow()).toBeFalsy();

    jest.advanceTimersByTime(1000);

    expect(tokenBucket.allow()).toBeTruthy();

    expect(tokenBucket.currentTokens).toEqual(maxTokens - 1);
  });
});
