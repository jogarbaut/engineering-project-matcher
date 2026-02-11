import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { SignOutButton } from '@/components/auth/sign-out-button';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back!</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Profile</h2>
          <dl className="mt-4 space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="text-sm text-gray-900">
                {user.full_name || 'Not set'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Years of Experience
              </dt>
              <dd className="text-sm text-gray-900">
                {user.years_of_experience || 'Not set'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex justify-end">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
