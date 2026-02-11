/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { ensureUserProfile } from './ensure-user-profile';

describe('ensureUserProfile', () => {
  test('creates profile when user does not exist', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'Test User',
      },
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
              error: { code: 'PGRST116' }, // Not found
            }),
          }),
        }),
        insert: vi.fn().mockResolvedValue({
          data: [{ id: mockUser.id }],
          error: null,
        }),
      }),
    } as any as SupabaseClient<Database>;

    await ensureUserProfile(mockSupabase);

    expect(mockSupabase.from).toHaveBeenCalledWith('users');
    expect(mockSupabase.from('users').insert).toHaveBeenCalledWith({
      id: mockUser.id,
      email: mockUser.email,
      full_name: mockUser.user_metadata.full_name,
    });
  });

  test('skips creation when profile already exists', async () => {
    const mockUser = {
      id: 'existing-user-id',
      email: 'existing@example.com',
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
              data: { id: mockUser.id },
              error: null,
            }),
          }),
        }),
        insert: vi.fn(),
      }),
    } as any as SupabaseClient<Database>;

    await ensureUserProfile(mockSupabase);

    expect(mockSupabase.from('users').insert).not.toHaveBeenCalled();
  });

  test('handles duplicate key error silently', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: {},
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
        insert: vi.fn().mockResolvedValue({
          data: null,
          error: {
            code: '23505',
            message: 'duplicate key value violates unique constraint',
          },
        }),
      }),
    } as any as SupabaseClient<Database>;

    await expect(ensureUserProfile(mockSupabase)).resolves.not.toThrow();
  });

  test('throws error for non-duplicate database errors', async () => {
    const mockUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: {},
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
        insert: vi.fn().mockResolvedValue({
          data: null,
          error: {
            code: 'SOME_ERROR',
            message: 'Some other error',
          },
        }),
      }),
    } as any as SupabaseClient<Database>;

    await expect(ensureUserProfile(mockSupabase)).rejects.toThrow();
  });

  test('throws error when user is not authenticated', async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
          error: { message: 'Not authenticated' },
        }),
      },
    } as any as SupabaseClient<Database>;

    await expect(ensureUserProfile(mockSupabase)).rejects.toThrow(
      'Not authenticated',
    );
  });
});
