'use client';

import React from 'react';
import { Flame, TrendingUp, ShieldAlert, Activity, Sparkles, BarChart3 } from 'lucide-react';
import { Article } from '@/components/ArticleCard';

interface SentimentGaugeProps {
  articles: Article[];
}

export default function SentimentGauge({ articles }: SentimentGaugeProps) {
  let bullish = 0;
  let bearish = 0;
  let neutral = 0;

  articles.forEach((a) => {
    const s = a.sentiment?.toLowerCase();
    if (s === 'bullish') bullish++;
    else if (s === 'bearish') bearish++;
    else neutral++;
  });

  const total = articles.length || 1;
  const bullishPct = Math.round((bullish / total) * 100);
  const bearishPct = Math.round((bearish / total) * 100);
  const neutralPct = Math.round((neutral / total) * 100);

  return (
    <div className="glass-panel p-6 md:p-7 rounded-3xl border border-purple-500/30 space-y-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-base font-extrabold font-heading text-white tracking-wide uppercase flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>24H AI Market Sentiment Gauge</span>
          </h2>
          <p className="text-xs text-purple-300/60 font-sans">
            Real-time aggregate sentiment analysis computed across active news channels
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-500/15 border border-emerald-500/35 px-3.5 py-1.5 rounded-full shadow-md shadow-emerald-950/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            +{bullishPct}% Bullish Bias
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-3.5 w-full bg-[#0a0718] rounded-full overflow-hidden flex p-0.5 border border-purple-500/25 shadow-inner">
          <div
            style={{ width: `${bullishPct}%` }}
            className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-l-full transition-all duration-700 shadow-lg shadow-emerald-500/30"
          />
          <div
            style={{ width: `${neutralPct}%` }}
            className="bg-gradient-to-r from-purple-500/50 to-indigo-500/50 h-full transition-all duration-700"
          />
          <div
            style={{ width: `${bearishPct}%` }}
            className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-r-full transition-all duration-700 shadow-lg shadow-rose-500/30"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-semibold text-purple-300/60 font-mono">
          <span>0% Bearish</span>
          <span>50% Neutral Equilibrium</span>
          <span>100% Bullish</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-1 text-center">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold font-heading">
            <Flame className="w-4 h-4 text-emerald-400" /> Bullish Signal
          </div>
          <div className="text-xl md:text-2xl font-black font-heading text-white pt-1">{bullishPct}%</div>
          <div className="text-[10px] text-emerald-300/70 font-semibold">{bullish} Stories</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/50 border border-purple-500/25 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-purple-300 text-xs font-bold font-heading">
            <BarChart3 className="w-4 h-4 text-purple-400" /> Neutral Index
          </div>
          <div className="text-xl md:text-2xl font-black font-heading text-white pt-1">{neutralPct}%</div>
          <div className="text-[10px] text-purple-300/70 font-semibold">{neutral} Stories</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 hover:border-rose-500/40 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-bold font-heading">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Bearish Risk
          </div>
          <div className="text-xl md:text-2xl font-black font-heading text-white pt-1">{bearishPct}%</div>
          <div className="text-[10px] text-rose-300/70 font-semibold">{bearish} Stories</div>
        </div>
      </div>
    </div>
  );
}
