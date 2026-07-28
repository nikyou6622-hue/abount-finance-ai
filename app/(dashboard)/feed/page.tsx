'use client';

import React, { useState, useEffect } from 'react';
import ArticleCard, { Article } from '@/components/ArticleCard';
import SentimentGauge from '@/components/SentimentGauge';
import HeroShowcase from '@/components/HeroShowcase';
import { Search, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'All Channels',
  'AI & Tech',
  'Markets & Trading',
  'Personal Finance',
  'Macro Economics',
  'Crypto & Web3',
];

export default function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Channels');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchArticles = async (cat = selectedCategory, q = searchQuery, p = page) => {
    setLoading(true);
    try {
      const categoryParam = cat === 'All Channels' ? '' : encodeURIComponent(cat);
      const url = `/api/articles?page=${p}&limit=12&category=${categoryParam}&search=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setArticles(data.articles || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchArticles(selectedCategory, searchQuery, 1);
  };

  const handleTriggerScrape = async () => {
    setScraping(true);
    try {
      await fetch('/api/scrape', { method: 'POST' });
      await fetchArticles();
    } catch (err) {
      console.error('Scrape trigger error:', err);
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="space-y-8">
      <HeroShowcase
        featuredArticle={articles[0]}
        onTriggerScrape={handleTriggerScrape}
        scraping={scraping}
        totalArticlesCount={totalCount}
      />

      <SentimentGauge articles={articles} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-heading whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-lg shadow-purple-900/40'
                    : 'bg-[#0d091f]/80 border border-purple-500/20 text-purple-300/70 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news or tickers..."
            className="w-full bg-[#0d091f]/90 border border-purple-500/20 focus:border-purple-500/50 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-purple-300/40 outline-none transition-all"
          />
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-4 animate-pulse">
              <div className="h-44 bg-purple-950/60 rounded-2xl" />
              <div className="h-6 bg-purple-950/80 rounded w-full" />
              <div className="h-12 bg-purple-950/40 rounded w-full" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-purple-500/20 text-center space-y-3">
          <h3 className="text-lg font-bold font-heading text-white">No Stories Found</h3>
          <p className="text-xs text-purple-300/70">No articles matched your search query. Try clearing filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
