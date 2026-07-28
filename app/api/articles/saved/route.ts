import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ articles: [] });
    }

    const { data, error } = await supabase
      .from('user_saved_articles')
      .select('article_id, articles(*, sources(name, category, url))')
      .eq('user_id', user.id);

    if (error || !data) {
      return NextResponse.json({ articles: [] });
    }

    const articles = data.map((item: any) => item.articles).filter(Boolean);
    return NextResponse.json({ articles });
  } catch (err: any) {
    return NextResponse.json({ articles: [] });
  }
}
