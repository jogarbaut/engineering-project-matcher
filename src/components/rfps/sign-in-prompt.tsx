import Link from 'next/link';

export function SignInPrompt({ totalCount }: { totalCount: number }) {
  const hiddenCount = totalCount - 10;

  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        {hiddenCount} more RFP{hiddenCount !== 1 ? 's' : ''} available
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Sign in to view all available opportunities
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-gray-600 px-6 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Sign In
        </Link>
        <Link
          href="/login"
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Try Demo Account
        </Link>
      </div>
    </div>
  );
}
