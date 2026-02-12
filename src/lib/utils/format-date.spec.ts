import { describe, expect, test } from 'vitest';
import { formatDate } from './format-date';

describe('formatDate', () => {
  test('formats valid ISO date strings', () => {
    const input = '2026-03-15';
    const expected = 'Mar 15, 2026';
    expect(formatDate(input)).toBe(expected);
  });

  test('handles null values', () => {
    const input = null;
    const expected = 'Not specified';
    expect(formatDate(input)).toBe(expected);
  });

  test('uses correct format (Month Day, Year)', () => {
    const input = '2026-01-01';
    const result = formatDate(input);
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
  });

  test('formats date with timestamp', () => {
    const input = '2026-04-20T12:00:00Z';
    const expected = 'Apr 20, 2026';
    expect(formatDate(input)).toBe(expected);
  });

  test('handles empty string as null', () => {
    const input = '';
    const expected = 'Not specified';
    expect(formatDate(input)).toBe(expected);
  });
});
