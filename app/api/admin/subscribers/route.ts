import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();
    
    // Fetch users with preferences
    const { data: subscribers, error } = await supabase
      .from('user_preferences')
      .select('id, user_id, email_digest, digest_frequency, created_at, profiles ( email, full_name, role )')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ subscribers: subscribers || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
