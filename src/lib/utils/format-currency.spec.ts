import { describe, expect, test } from 'vitest';
import { formatCurrency } from './format-currency';

describe('formatCurrency', () => {
  test('formats whole numbers correctly', () => {
    const input = 1000;
    const expected = '$1,000';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('handles null values', () => {
    const input = null;
    const expected = 'Not specified';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('formats large numbers with commas', () => {
    const input = 15000000;
    const expected = '$15,000,000';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('rounds to nearest dollar (no cents)', () => {
    const input = 2500000;
    const result = formatCurrency(input);
    expect(result).not.toContain('.');
    expect(result).toBe('$2,500,000');
  });

  test('formats zero correctly', () => {
    const input = 0;
    const expected = '$0';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('formats single digit numbers', () => {
    const input = 5;
    const expected = '$5';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('formats string numbers correctly', () => {
    const input = '2500000';
    const expected = '$2,500,000';
    expect(formatCurrency(input)).toBe(expected);
  });

  test('formats string with decimals', () => {
    const input = '1500000.75';
    const result = formatCurrency(input);
    expect(result).toBe('$1,500,001');
  });
});
