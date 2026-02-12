/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { getRfps } from './get-rfps';
import * as serverModule from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');

describe('getRfps', () => {
  test('fetches RFPs from database', async () => {
    const mockRfps = [
      {
        id: 'test-id-1',
        title: 'Test RFP 1',
        agency_name: 'Test Agency',
        due_date: '2026-03-15',
        estimated_value: 1000000,
        location: 'Test City',
      },
    ];

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockRfps,
            error: null,
          }),
        }),
      }),
    } as any;

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase);

    const result = await getRfps();

    expect(serverModule.createClient).toHaveBeenCalled();
    expect(mockSupabase.from).toHaveBeenCalledWith('rfps');
    expect(result).toEqual(mockRfps);
  });

  test('orders by due_date ascending', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      }),
    } as any;

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase);

    await getRfps();

    const orderMock = mockSupabase.from('rfps').select('*').order;
    expect(orderMock).toHaveBeenCalledWith('due_date', { ascending: true });
  });

  test('returns empty array when no RFPs', async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
        }),
      }),
    } as any;

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase);

    const result = await getRfps();

    expect(result).toEqual([]);
  });

  test('throws on database error', async () => {
    const mockError = new Error('Database error');

    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            error: mockError,
          }),
        }),
      }),
    } as any;

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase);

    await expect(getRfps()).rejects.toThrow('Database error');
  });
});
