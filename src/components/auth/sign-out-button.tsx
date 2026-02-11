'use client';

import { signOut } from '@/lib/auth/sign-out';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
    >
      Sign Out
    </button>
  );
}
