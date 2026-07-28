'use client';

import React, { useState } from 'react';
import { Bookmark, ExternalLink, ThumbsUp, Flame, ShieldAlert, MinusCircle, Loader2 } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  author?: string;
  source?: string;
  category: string;
  sentiment?: 'bullish' | 'neutral' | 'bearish' | string;
  sentiment_score?: number;
  upvotes?: number;
  published_at: string;
  image_url?: string;
  imageUrl?: string;
  isSaved?: boolean;
  sources?: {
    name: string;
    category?: string;
    url?: string;
  };
}

const CATEGORY_IMAGE_FALLBACKS: Record<string, string> = {
  'AI & Tech': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'Markets & Trading': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
  'Personal Finance': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
  'Macro Economics': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
  'Crypto & Web3': 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=800&auto=format&fit=crop&q=80',
};

export function getArticleImageUrl(article: Article): string {
  if (article.image_url && article.image_url.startsWith('http')) return article.image_url;
  if (article.imageUrl && article.imageUrl.startsWith('http')) return article.imageUrl;
  return CATEGORY_IMAGE_FALLBACKS[article.category] || CATEGORY_IMAGE_FALLBACKS['AI & Tech'];
}

interface ArticleCardProps {
  article: Article;
  onToggleSave?: (id: string) => Promise<void> | void;
}

export default function ArticleCard({ article, onToggleSave }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(article.isSaved || false);
  const [saving, setSaving] = useState(false);
  const [imgSrc, setImgSrc] = useState(getArticleImageUrl(article));

  const handleBookmarkClick = async () => {
    setSaving(true);
    try {
      if (onToggleSave) {
        await onToggleSave(article.id);
      } else {
        const res = await fetch(`/api/articles/${article.id}/save`, { method: 'POST' });
        const data = await res.json();
        if (res.ok) setIsSaved(data.isSaved);
      }
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Save toggle error:', err);
    } finally {
      setSaving(false);
    }
  };

  const getSentimentBadge = () => {
    const s = article.sentiment?.toLowerCase();
    if (s === 'bullish') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
          <Flame className="w-3 h-3 text-emerald-400" /> Bullish ({article.sentiment_score ?? '+0.6'})
        </span>
      );
    } else if (s === 'bearish') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 backdrop-blur-md">
          <ShieldAlert className="w-3 h-3 text-rose-400" /> Bearish ({article.sentiment_score ?? '-0.5'})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30 backdrop-blur-md">
        <MinusCircle className="w-3 h-3 text-purple-400" /> Neutral
      </span>
    );
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffHrs = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
      if (diffHrs < 1) return 'Just now';
      if (diffHrs < 24) return `${diffHrs}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  const sourceName = article.sources?.name || article.source || article.category || 'Financial News';

  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between h-full group border border-purple-500/20 hover:border-purple-500/50 shadow-xl shadow-purple-950/20 transition-all duration-300">
      <div className="relative h-44 w-full overflow-hidden bg-purple-950/60">
        <img
          src={imgSrc}
          alt={article.title}
          onError={() => setImgSrc(CATEGORY_IMAGE_FALLBACKS[article.category] || CATEGORY_IMAGE_FALLBACKS['AI & Tech'])}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080613] via-purple-950/30 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="bg-purple-950/80 backdrop-blur-md text-purple-200 border border-purple-500/40 text-[10px] font-extrabold font-heading uppercase tracking-wider px-2.5 py-1 rounded-lg">
            {sourceName}
          </span>
          {getSentimentBadge()}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] text-purple-300/60 font-semibold">
            <span>{article.category}</span>
            <span>•</span>
            <span>{formatTime(article.published_at)}</span>
          </div>

          <h3 className="text-base font-bold font-heading text-white group-hover:text-purple-300 transition-colors leading-snug line-clamp-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {article.title}
            </a>
          </h3>

          <p className="text-purple-200/70 text-xs line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-purple-300/80 font-semibold">
              <ThumbsUp className="w-3.5 h-3.5 text-purple-400" />
              <span>{article.upvotes || 42}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBookmarkClick}
              disabled={saving}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-purple-600/30 border-purple-500/60 text-purple-200'
                  : 'bg-purple-950/40 border-purple-500/20 hover:bg-purple-900/40 text-purple-300/70 hover:text-white'
              }`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> : <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-purple-300' : ''}`} />}
            </button>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:bg-purple-600/30 text-purple-300/70 hover:text-white transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
