import { describe, it, expect, vi } from 'vitest';
import isTokenExpired from './isTokenExpired';

describe('isTokenExpired', () => {
  const getTokenWithExpiration = (expiryTime: number): string => {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { exp: expiryTime };
    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    return `${base64Header}.${base64Payload}`;
  };

  it('should return true for null token', () => {
    expect(isTokenExpired(null)).toBe(true);
  });

  it('should return true for an expired token', () => {
    const expiredToken = getTokenWithExpiration(Math.floor(Date.now() / 1000) - 1000);
    expect(isTokenExpired(expiredToken)).toBe(true);
  });

  it('should return false for a valid, non-expired token', () => {
    const validToken = getTokenWithExpiration(Math.floor(Date.now() / 1000) + 1000);
    expect(isTokenExpired(validToken)).toBe(false);
  });

  it('should return true for an invalid token', () => {
    const invalidToken = 'header.payload';
    expect(isTokenExpired(invalidToken)).toBe(true);
  });

  it('should handle token parsing errors gracefully', () => {
    const malformedToken = 'header..signature';
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(isTokenExpired(malformedToken)).toBe(true);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to decode token:', expect.any(SyntaxError));
    consoleErrorSpy.mockRestore();
  });
});
