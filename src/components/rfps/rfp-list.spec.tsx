import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RfpList } from './rfp-list';
import type { Rfp } from '@/types/rfp';

describe('RfpList', () => {
  const mockRfps: Rfp[] = [
    {
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
    },
    {
      id: 'test-id-2',
      title: 'Municipal Water Treatment Facility',
      description: 'Upgrade and expansion of water treatment infrastructure',
      agency_name: 'City Water Authority',
      due_date: '2026-04-01',
      estimated_value: '5000000',
      required_licenses: null,
      location: 'Phoenix, AZ',
      scraped_url: null,
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-02-01T00:00:00Z',
    },
    {
      id: 'test-id-3',
      title: 'Solar Farm Installation',
      description: 'Design, procurement, and installation of 50MW solar farm',
      agency_name: 'State Energy Commission',
      due_date: '2026-02-28',
      estimated_value: '15000000',
      required_licenses: null,
      location: 'Austin, TX',
      scraped_url: null,
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-02-01T00:00:00Z',
    },
  ];

  test('renders all RFPs when data exists', () => {
    const rfps = mockRfps;
    render(<RfpList rfps={rfps} />);
    expect(
      screen.getByText('Highway Bridge Reconstruction'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Municipal Water Treatment Facility'),
    ).toBeInTheDocument();
    expect(screen.getByText('Solar Farm Installation')).toBeInTheDocument();
  });

  test('renders empty state when no RFPs', () => {
    const rfps: Rfp[] = [];
    render(<RfpList rfps={rfps} />);
    expect(
      screen.getByText('No RFPs available at this time.'),
    ).toBeInTheDocument();
  });

  test('renders correct number of RfpCard components', () => {
    const rfps = mockRfps;
    const { container } = render(<RfpList rfps={rfps} />);
    const cards = container.querySelectorAll(
      '.rounded-lg.border.border-gray-200.bg-white.p-6.shadow-sm',
    );
    expect(cards).toHaveLength(3);
  });
});
