import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export async function ensureUserProfile(
  supabase: SupabaseClient<Database>,
): Promise<void> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (existingProfile) {
    return; // Profile already exists
  }

  // Create profile from OAuth data
  const { error: insertError } = await supabase.from('users').insert({
    id: user.id,
    email: user.email!,
    full_name: (user.user_metadata.full_name as string | undefined) || null,
  });

  // Ignore duplicate key errors (race condition)
  if (insertError && !insertError.message.includes('duplicate')) {
    throw insertError;
  }
}
