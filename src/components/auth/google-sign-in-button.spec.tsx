/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GoogleSignInButton } from './google-sign-in-button';
import * as clientModule from '@/lib/supabase/client';

vi.mock('@/lib/supabase/client');

describe('GoogleSignInButton', () => {
  test('renders button correctly', () => {
    render(<GoogleSignInButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
  });

  test('calls signInWithOAuth on click', async () => {
    const mockSignInWithOAuth = vi.fn().mockResolvedValue({ error: null });
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
      },
    };

    vi.mocked(clientModule.createClient).mockReturnValue(mockSupabase as any);

    render(<GoogleSignInButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: expect.stringContaining('/auth/callback'),
        },
      });
    });
  });

  test('shows loading state during sign in', async () => {
    const mockSignInWithOAuth = vi
      .fn()
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ error: null }), 100),
          ),
      );
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
      },
    };

    vi.mocked(clientModule.createClient).mockReturnValue(mockSupabase as any);

    render(<GoogleSignInButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  test('displays error message on failure', async () => {
    const mockSignInWithOAuth = vi.fn().mockResolvedValue({
      error: { message: 'OAuth error' },
    });
    const mockSupabase = {
      auth: {
        signInWithOAuth: mockSignInWithOAuth,
      },
    };

    vi.mocked(clientModule.createClient).mockReturnValue(mockSupabase as any);

    render(<GoogleSignInButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to sign in. please try again/i),
      ).toBeInTheDocument();
    });
  });
});
