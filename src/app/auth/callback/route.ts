import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ensureUserProfile } from '@/lib/auth/ensure-user-profile';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Ensure user profile exists
  try {
    await ensureUserProfile(supabase);
  } catch (err) {
    console.error('Failed to ensure user profile:', err);
    // Continue anyway - profile might already exist
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
