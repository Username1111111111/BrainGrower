import { describe, it, expect } from 'vitest';
import formatDate from './formatDate';

describe('formatDate', () => {
  it('should format date strings correctly', () => {
    const dateString = '2024-07-22T14:30:00Z';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('18:30 22.07.2024');
  });

  it('should format Date objects correctly', () => {
    const date = new Date('2024-07-22T14:30:00Z');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('18:30 22.07.2024');
  });

  it('should handle single-digit days and months correctly', () => {
    const dateString = '2024-01-01T05:09:00Z';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('09:09 01.01.2024');
  });

  it('should handle the current date and time', () => {
    const now = new Date();
    const formattedDate = formatDate(now);
    const hours = `${String(now.getUTCHours() + 4).padStart(2, '0')}`;
    const minutes = `${String(now.getUTCMinutes()).padStart(2, '0')}`;
    const days = `${String(now.getUTCDate()).padStart(2, '0')}`;
    const months = `${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
    const expected = `${hours}:${minutes} ${days}.${months}.${now.getUTCFullYear()}`;
    expect(formattedDate).toBe(expected);
  });

  it('should handle invalid date strings gracefully', () => {
    const invalidDateString = 'invalid-date';
    const formattedDate = formatDate(invalidDateString);
    expect(formattedDate).toBe('Invalid Date');
  });

  it('should handle invalid Date objects gracefully', () => {
    const invalidDate = new Date('invalid-date');
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe('Invalid Date');
  });
});
