/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { GET } from './route';
import * as serverModule from '@/lib/supabase/server';
import * as ensureProfileModule from '@/lib/auth/ensure-user-profile';

vi.mock('@/lib/supabase/server');
vi.mock('@/lib/auth/ensure-user-profile');

describe('GET /auth/callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('successful code exchange redirects to dashboard', async () => {
    const mockSupabase = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({
          data: { session: { access_token: 'token' } },
          error: null,
        }),
      },
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);
    vi.mocked(ensureProfileModule.ensureUserProfile).mockResolvedValue();

    const request = new Request(
      'http://localhost:3000/auth/callback?code=test-code',
    );

    const response = await GET(request);

    expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(
      'test-code',
    );
    expect(ensureProfileModule.ensureUserProfile).toHaveBeenCalledWith(
      mockSupabase,
    );
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/dashboard',
    );
  });

  test('missing code redirects to login with error', async () => {
    const request = new Request('http://localhost:3000/auth/callback');

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?error=no_code',
    );
  });

  test('failed code exchange redirects to login with error', async () => {
    const mockSupabase = {
      auth: {
        exchangeCodeForSession: vi.fn().mockResolvedValue({
          data: { session: null },
          error: { message: 'Invalid code' },
        }),
      },
    };

    vi.mocked(serverModule.createClient).mockResolvedValue(mockSupabase as any);

    const request = new Request(
      'http://localhost:3000/auth/callback?code=bad-code',
    );

    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?error=auth_failed',
    );
  });
});
