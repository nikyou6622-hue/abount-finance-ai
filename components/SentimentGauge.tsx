'use client';

import React from 'react';
import { Flame, TrendingUp, ShieldAlert, Activity } from 'lucide-react';
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
    <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-extrabold font-heading text-white tracking-wide uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span>24H Market Sentiment Index</span>
        </h2>
        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
          +{bullishPct}% Bullish Bias
        </span>
      </div>

      <div className="h-3 w-full bg-purple-950/60 rounded-full overflow-hidden flex p-0.5 border border-purple-500/20">
        <div style={{ width: `${bullishPct}%` }} className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-l-full transition-all duration-500" />
        <div style={{ width: `${neutralPct}%` }} className="bg-purple-500/40 h-full transition-all duration-500" />
        <div style={{ width: `${bearishPct}%` }} className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-r-full transition-all duration-500" />
      </div>

      <div className="grid grid-cols-3 gap-3 pt-1 text-center">
        <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[11px] font-bold">
            <Flame className="w-3.5 h-3.5" /> Bullish
          </div>
          <span className="text-lg font-black font-heading text-white">{bullishPct}%</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-purple-950/40 border border-purple-500/20">
          <div className="flex items-center justify-center gap-1 text-purple-300 text-[11px] font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> Neutral
          </div>
          <span className="text-lg font-black font-heading text-white">{neutralPct}%</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
          <div className="flex items-center justify-center gap-1 text-rose-400 text-[11px] font-bold">
            <ShieldAlert className="w-3.5 h-3.5" /> Bearish
          </div>
          <span className="text-lg font-black font-heading text-white">{bearishPct}%</span>
        </div>
      </div>
    </div>
  );
}
