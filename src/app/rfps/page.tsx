import { getCurrentUser } from '@/lib/auth/get-current-user';
import { getRfps } from '@/lib/rfps/get-rfps';
import { RfpList } from '@/components/rfps/rfp-list';
import { SignInPrompt } from '@/components/rfps/sign-in-prompt';

const PREVIEW_LIMIT = 10;

export default async function RfpsPage() {
  const user = await getCurrentUser();
  const allRfps = await getRfps();

  // Unauthenticated users see only first 10 RFPs
  const displayedRfps = user ? allRfps : allRfps.slice(0, PREVIEW_LIMIT);
  const showSignInPrompt = !user && allRfps.length > PREVIEW_LIMIT;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Available RFPs</h1>
          {!user && (
            <p className="text-sm text-gray-600">
              Showing {displayedRfps.length} of {allRfps.length}
            </p>
          )}
        </div>
        <RfpList rfps={displayedRfps} />
        {showSignInPrompt && <SignInPrompt totalCount={allRfps.length} />}
      </div>
    </main>
  );
}
