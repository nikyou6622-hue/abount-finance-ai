import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createAdminClient();

    // 1. Total Articles Count
    const { count: articlesCount } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });

    // 2. Active Sources Count
    const { count: activeSourcesCount } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // 3. Total Sources Count
    const { count: totalSourcesCount } = await supabase
      .from('sources')
      .select('*', { count: 'exact', head: true });

    // 4. Scrape Logs Stats
    const { data: recentLogs } = await supabase
      .from('scrape_logs')
      .select('status, articles_found, ran_at')
      .order('ran_at', { ascending: false })
      .limit(50);

    let successfulScrapes = 0;
    const totalScrapes = recentLogs?.length || 0;
    (recentLogs || []).forEach((l) => {
      if (l.status === 'success') successfulScrapes++;
    });

    const scrapeSuccessRate = totalScrapes > 0 ? Math.round((successfulScrapes / totalScrapes) * 100) : 100;

    // 5. Total User Preferences / Subscribers Count
    const { count: subscribersCount } = await supabase
      .from('user_preferences')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      stats: {
        totalArticles: articlesCount || 0,
        activeSources: activeSourcesCount || 0,
        totalSources: totalSourcesCount || 0,
        scrapeSuccessRate,
        totalSubscribers: subscribersCount || 0,
        lastScrapeAt: recentLogs?.[0]?.ran_at || new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch admin stats' }, { status: 500 });
  }
}
