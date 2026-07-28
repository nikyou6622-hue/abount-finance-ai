'use client';

import React from 'react';
import { Sparkles, RefreshCw, Layers, Database, ExternalLink, Zap } from 'lucide-react';
import { Article } from '@/components/ArticleCard';

interface HeroShowcaseProps {
  featuredArticle?: Article;
  onTriggerScrape: () => void;
  scraping: boolean;
  totalArticlesCount: number;
}

export default function HeroShowcase({
  featuredArticle,
  onTriggerScrape,
  scraping,
  totalArticlesCount,
}: HeroShowcaseProps) {
  return (
    <div className="relative rounded-3xl bg-[#0f0b24] border border-purple-500/30 p-6 md:p-8 overflow-hidden shadow-2xl space-y-6">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Heading & System Stats */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>24H Real-Time Market & AI Intelligence Stream</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Financial AI</span> Market Feed
          </h1>

          <p className="text-xs md:text-sm text-purple-200/70 max-w-xl font-sans leading-relaxed">
            Automated multi-source news aggregator parsing live signals from Financial Times, MarketWatch, CoinDesk, and Reddit with AI-driven sentiment analysis.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-md pt-2">
            <div className="p-3 bg-[#160f38]/80 border border-purple-500/20 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-purple-400 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" />
                <span>Live Stories</span>
              </div>
              <div className="text-xl font-extrabold text-white font-heading">
                {totalArticlesCount || 140}
              </div>
            </div>

            <div className="p-3 bg-[#160f38]/80 border border-purple-500/20 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Sentiment</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-400 font-heading">
                +68% 🚀
              </div>
            </div>

            <div className="p-3 bg-[#160f38]/80 border border-purple-500/20 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-semibold">
                <Database className="w-3.5 h-3.5" />
                <span>Sources</span>
              </div>
              <div className="text-xl font-extrabold text-white font-heading">
                6 Feeds
              </div>
            </div>
          </div>

          {/* Trigger Button & Status */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onTriggerScrape}
              disabled={scraping}
              className="inline-flex items-center gap-2 glow-button-purple text-xs font-bold font-heading px-6 py-3.5 rounded-2xl shadow-xl shadow-purple-600/30 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${scraping ? 'animate-spin' : ''}`} />
              <span>{scraping ? 'Syncing Feeds...' : 'Trigger Live Scrape Job'}</span>
            </button>

            <span className="text-xs text-purple-300/60 font-semibold">
              Auto-Sync Active (Every 30m)
            </span>
          </div>
        </div>

        {/* Right Column: Featured Breaking Story Card */}
        <div className="lg:col-span-5">
          {featuredArticle ? (
            <div className="p-6 rounded-3xl bg-purple-950/40 border border-purple-500/30 space-y-4 shadow-xl relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-md bg-purple-600/40 border border-purple-500/50 text-purple-200 text-[10px] font-mono font-bold uppercase">
                  {featuredArticle.sources?.name || 'BREAKING STORY'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase">
                  BREAKING STORY
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-heading line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
                {featuredArticle.title}
              </h3>

              <p className="text-xs text-purple-200/70 line-clamp-3 leading-relaxed">
                {featuredArticle.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-purple-500/20 text-xs">
                <span className="font-semibold text-emerald-400">
                  Sentiment: {(featuredArticle.sentiment || 'BULLISH').toUpperCase()}
                </span>

                <a
                  href={featuredArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-white font-bold transition-colors"
                >
                  <span>Read Original Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-purple-950/40 border border-purple-500/30 space-y-3 shadow-xl">
              <span className="px-3 py-1 rounded-md bg-purple-600/40 text-purple-200 text-[10px] font-mono font-bold">
                MARKETWATCH RSS
              </span>
              <h3 className="text-base font-bold text-white font-heading">
                Tech fund manager says the market is misreading Alphabet's second-quarter earnings
              </h3>
              <p className="text-xs text-purple-200/70">
                Investors should focus more on earnings growth and less on capital expenditures, says Catalyst Funds' chief investment officer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
