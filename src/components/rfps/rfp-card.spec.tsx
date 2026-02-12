import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RfpCard } from './rfp-card';
import type { Rfp } from '@/types/rfp';

vi.mock('@/lib/utils/format-currency', () => ({
  formatCurrency: (value: string | number | null) => {
    if (value === null) return 'Not specified';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `$${num.toLocaleString()}`;
  },
}));

vi.mock('@/lib/utils/format-date', () => ({
  formatDate: (date: string | null) =>
    date ? 'Mar 15, 2026' : 'Not specified',
}));

describe('RfpCard', () => {
  const mockRfp: Rfp = {
    id: 'test-id-1',
    title: 'Highway Bridge Reconstruction',
    description: 'Design and construction of highway bridge replacement',
    agency_name: 'Department of Transportation',
    due_date: '2026-03-15',
    estimated_value: '2500000',
    required_licenses: null,
    location: 'Los Angeles, CA',
    scraped_url: null,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
  };

  test('renders RFP title', () => {
    render(<RfpCard rfp={mockRfp} />);
    expect(
      screen.getByText('Highway Bridge Reconstruction'),
    ).toBeInTheDocument();
  });

  test('renders all essential fields', () => {
    render(<RfpCard rfp={mockRfp} />);
    expect(
      screen.getByText(/Department of Transportation/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Mar 15, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/\$2,500,000/)).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles, CA/)).toBeInTheDocument();
  });

  test('handles null agency_name', () => {
    const rfpWithoutAgency: Rfp = { ...mockRfp, agency_name: null };
    render(<RfpCard rfp={rfpWithoutAgency} />);
    expect(screen.getByText(/Not specified/)).toBeInTheDocument();
  });

  test('handles null location', () => {
    const rfpWithoutLocation: Rfp = { ...mockRfp, location: null };
    render(<RfpCard rfp={rfpWithoutLocation} />);
    expect(screen.getByText(/Not specified/)).toBeInTheDocument();
  });

  test('uses format helpers correctly', () => {
    render(<RfpCard rfp={mockRfp} />);
    // formatDate is called (mocked to return 'Mar 15, 2026')
    expect(screen.getByText(/Mar 15, 2026/)).toBeInTheDocument();
    // formatCurrency is called (mocked to return formatted value)
    expect(screen.getByText(/\$2,500,000/)).toBeInTheDocument();
  });
});
