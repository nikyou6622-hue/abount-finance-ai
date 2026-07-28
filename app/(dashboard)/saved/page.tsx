'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import ArticleCard, { Article } from '@/components/ArticleCard';
import { Bookmark, Sparkles, Loader2 } from 'lucide-react';

export default function SavedPage() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/articles/saved');
      const data = await res.json();
      if (res.ok) setSavedArticles(data.articles || []);
    } catch (err) {
      console.error('Saved fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-2 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Bookmark className="w-3.5 h-3.5 text-purple-400" />
          <span>Saved Market Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">Your Saved Bookmarks</h1>
        <p className="text-xs text-purple-300/70 max-w-lg">
          Access your personal reading list of bookmarked market analysis, AI signals, and breaking news.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-purple-300">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
        </div>
      ) : savedArticles.length === 0 ? (
        <div className="glass-card text-center py-16 p-8 rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">No saved bookmarks yet</h3>
          <p className="text-xs text-purple-300/60 max-w-sm mx-auto">
            Click the bookmark icon on any article card in the Live Stream feed to save it for offline reading.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard key={article.id} article={{ ...article, isSaved: true }} onToggleSave={fetchSaved} />
          ))}
        </div>
      )}
    </div>
  );
}
