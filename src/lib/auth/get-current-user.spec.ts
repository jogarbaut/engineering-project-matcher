/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { getCurrentUser } from './get-current-user';
import * as serverModule from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('getCurrentUser', () => {
  test('returns user profile when authenticated', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    const mockProfile = {
      id: 'test-user-id',
      email: 'test@example.com',
      full_name: 'Test User',
      years_of_experience: 5,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockProfile,
              error: null,
            }),
          }),
        }),
      }),
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();

    expect(result).toEqual(mockProfile);
    expect(mockSupabase.from).toHaveBeenCalledWith('users');
  });

  test('returns null when not authenticated', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'Not authenticated' },
        }),
      },
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();

    expect(result).toBeNull();
  });

  test('returns null when profile does not exist', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
      },
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' },
            }),
          }),
        }),
      }),
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);

    const result = await getCurrentUser();

    expect(result).toBeNull();
  });
});
