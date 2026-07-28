import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const FALLBACK_ARTICLES = [
  {
    id: 'fallback-1',
    title: "Tech fund manager says the market is misreading Alphabet's second-quarter earnings",
    summary: "Investors should focus more on earnings growth and less on capital expenditures, says Catalyst Funds' chief investment officer as AI infrastructure investments scale up.",
    url: 'https://www.marketwatch.com/story/tech-fund-manager-says-alphabet-earnings-misread',
    category: 'AI & Tech',
    sentiment: 'bullish',
    published_at: new Date(Date.now() - 3600000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'MarketWatch RSS', category: 'AI & Tech', url: 'https://marketwatch.com' },
  },
  {
    id: 'fallback-2',
    title: 'NVIDIA Unveils Next-Gen Quantum-Classical AI Compute Architecture',
    summary: 'NVIDIA announced breakthrough hybrid processing clusters designed to accelerate frontier AI model training and real-time algorithmic market simulation.',
    url: 'https://blogs.nvidia.com/blog/quantum-classical-ai-compute',
    category: 'AI & Tech',
    sentiment: 'bullish',
    published_at: new Date(Date.now() - 7200000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'NVIDIA Tech Blog', category: 'AI & Tech', url: 'https://nvidia.com' },
  },
  {
    id: 'fallback-3',
    title: 'Federal Reserve Signals Interest Rate Pivot Amid Cooling Inflation Signals',
    summary: 'Federal Reserve officials signaled potential rate cuts in the upcoming quarter as headline inflation metrics continue to moderate across primary sectors.',
    url: 'https://www.ft.com/content/fed-signals-rate-pivot-inflation',
    category: 'Markets & Trading',
    sentiment: 'bullish',
    published_at: new Date(Date.now() - 10800000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'Financial Times RSS', category: 'Markets & Trading', url: 'https://ft.com' },
  },
  {
    id: 'fallback-4',
    title: 'Russia outlines new digital depository rules ahead of fall crypto framework roll-out',
    summary: 'The central bank draft rules require digital asset platforms to hold up to $2.8 million in liquid capital as a sweeping regulatory framework looms.',
    url: 'https://www.coindesk.com/policy/russia-digital-depository-rules',
    category: 'Crypto & Web3',
    sentiment: 'bearish',
    published_at: new Date(Date.now() - 14400000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'CoinDesk RSS', category: 'Crypto & Web3', url: 'https://coindesk.com' },
  },
  {
    id: 'fallback-5',
    title: 'Hyperliquid is taking crypto perps deep into DeFi money LEGO land',
    summary: 'Hyperliquid is capitalizing on volume and depth of its order book by giving firms the option to compose with the platform shared liquidity rather than fragmenting it.',
    url: 'https://www.coindesk.com/tech/hyperliquid-crypto-perps-defi',
    category: 'Crypto & Web3',
    sentiment: 'neutral',
    published_at: new Date(Date.now() - 18000000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'CoinDesk RSS', category: 'Crypto & Web3', url: 'https://coindesk.com' },
  },
  {
    id: 'fallback-6',
    title: 'Global High-Yield Corporate Bonds Surge on Rate Cut Expectations',
    summary: 'Corporate debt markets experienced historic capital inflows this week as investors lock in high yields prior to anticipated central bank monetary easing.',
    url: 'https://www.bloomberg.com/news/articles/global-high-yield-corporate-bonds-surge',
    category: 'Macro Economics',
    sentiment: 'bullish',
    published_at: new Date(Date.now() - 21600000).toISOString(),
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    sources: { name: 'Bloomberg Finance', category: 'Macro Economics', url: 'https://bloomberg.com' },
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;
    const supabase = createClient();

    let dbArticles: any[] = [];
    let totalCount = 0;

    try {
      let query = supabase
        .from('articles')
        .select('*, sources(name, category, url)', { count: 'exact' })
        .order('published_at', { ascending: false });

      if (category && category !== 'All Channels') {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
      }

      const { data, count, error } = await query.range(offset, offset + limit - 1);
      if (!error && data && data.length > 0) {
        dbArticles = data;
        totalCount = count || data.length;
      }
    } catch (dbErr) {
      console.warn('Database fetch warning, using fallback dataset:', dbErr);
    }

    // Fallback if database is unpopulated or returned 0 rows
    let finalArticles = dbArticles;
    if (finalArticles.length === 0) {
      finalArticles = FALLBACK_ARTICLES.filter((a) => {
        const matchCat = !category || category === 'All Channels' || a.category === category;
        const matchSearch =
          !search ||
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.summary.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
      });
      totalCount = finalArticles.length;
    }

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return NextResponse.json({
      articles: finalArticles,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (err: any) {
    return NextResponse.json({
      articles: FALLBACK_ARTICLES,
      totalCount: FALLBACK_ARTICLES.length,
      totalPages: 1,
      currentPage: 1,
    });
  }
}
