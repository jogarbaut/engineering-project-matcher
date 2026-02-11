/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { signOut } from './sign-out';
import * as serverModule from '@/lib/supabase/server';

vi.mock('@/lib/supabase/server');
vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

describe('signOut', () => {
  test('signs out user and redirects to login', async () => {
    const mockSupabase = {
      auth: {
        signOut: vi.fn().mockResolvedValue({ error: null }),
      },
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);

    await expect(signOut()).rejects.toThrow('NEXT_REDIRECT:/login');
    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });
});
