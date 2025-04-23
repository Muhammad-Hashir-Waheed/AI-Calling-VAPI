'use server';

import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

export const getUserExistsByEmail = async (email: string) => {
  const adminClient = getSupabaseServerAdminClient();

  const { data } = await adminClient
    .from('accounts')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();

  if (data) return true;

  return false;
};
