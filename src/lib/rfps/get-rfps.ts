import { createClient } from '@/lib/supabase/server';
import type { Rfp } from '@/types/rfp';

export async function getRfps(): Promise<Rfp[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('rfps')
    .select('*')
    .order('due_date', { ascending: true });

  if (error) throw error;
  return (data as Rfp[]) ?? [];
}
