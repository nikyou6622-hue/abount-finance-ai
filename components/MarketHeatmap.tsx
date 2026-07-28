'use client';

import React, { useState } from 'react';
import { Flame, TrendingUp, TrendingDown, Minus, Sparkles, ArrowRight, ShieldAlert, Cpu, DollarSign, Globe, Coins, LineChart } from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  score: number;
  status: 'bullish' | 'neutral' | 'bearish';
  icon: any;
  tickers: string[];
  takeaways: string[];
  impact: string;
}

const SECTORS: Sector[] = [
  {
    id: 'ai-tech',
    name: 'AI & Semiconductors',
    score: 84,
    status: 'bullish',
    icon: Cpu,
    tickers: ['NVDA +4.2%', 'TSMC +2.8%', 'MSFT +1.5%'],
    takeaways: [
      'NVIDIA Blackwell architecture shipment projections increased by 15% for Q3.',
      'Hyperscale cloud Capex on AI infrastructure exceeds $180B annualized rate.',
      'Chip supply constraints easing across advanced 3nm foundry nodes.',
    ],
    impact: 'High Positive Market Surge',
  },
  {
    id: 'crypto',
    name: 'Crypto & Digital Assets',
    score: 76,
    status: 'bullish',
    icon: Coins,
    tickers: ['BTC $97.4K', 'ETH $3.4K', 'SOL +6.1%'],
    takeaways: [
      'Institutional spot ETF net inflows reach record $1.2B weekly streak.',
      'Decentralized finance total value locked (TVL) surges past $110 Billion.',
      'Regulatory clarity proposals gaining bipartisan momentum in US Congress.',
    ],
    impact: 'Strong Momentum Growth',
  },
  {
    id: 'equities',
    name: 'US Equities & S&P 500',
    score: 68,
    status: 'bullish',
    icon: LineChart,
    tickers: ['SPY +0.8%', 'QQQ +1.2%', 'DIA +0.3%'],
    takeaways: [
      'Corporate earnings beats outpace historical averages across 74% of S&P companies.',
      'Tech sector earnings resilience offsets retail inventory normalization.',
      'Analyst consensus targets S&P 500 index expansion toward 6,200 milestone.',
    ],
    impact: 'Steady Bullish Trend',
  },
  {
    id: 'macro',
    name: 'Macro Economics & Fed',
    score: 52,
    status: 'neutral',
    icon: Globe,
    tickers: ['FED RATE 5.25%', 'CPI 2.6%', 'USD INDEX 104.1'],
    takeaways: [
      'Federal Reserve signals data-dependent policy stance for upcoming FOMC meeting.',
      'Consumer Price Index (CPI) moderation aligns with soft-landing trajectories.',
      'Labor market cooling gradually without spike in initial unemployment claims.',
    ],
    impact: 'Balanced Market Consolidation',
  },
  {
    id: 'personal',
    name: 'Yields & Fixed Income',
    score: 62,
    status: 'bullish',
    icon: DollarSign,
    tickers: ['US 10Y 4.22%', 'US 2Y 4.38%', 'HIGH YIELD 6.8%'],
    takeaways: [
      'Treasury yield curve inversions narrowing as rate cuts approach horizon.',
      'Money market fund assets hit record high as investors lock in risk-free yield.',
      'Corporate bond issuance met with oversubscribed institutional demand.',
    ],
    impact: 'Moderate Positive Inflows',
  },
  {
    id: 'commodities',
    name: 'Energy & Geopolitics',
    score: 38,
    status: 'bearish',
    icon: ShieldAlert,
    tickers: ['BRENT $74.2', 'GOLD $2,640', 'NAT GAS -3.1%'],
    takeaways: [
      'Middle East shipping lane supply chain friction creates spot price volatility.',
      'OPEC+ output policy delays trigger mixed Crude inventory drawdown reports.',
      'Gold consolidates near all-time high as central bank hedging reserves grow.',
    ],
    impact: 'Increased Hedging & Risk Caution',
  },
];

export default function MarketHeatmap() {
  const [selectedSector, setSelectedSector] = useState<Sector>(SECTORS[0]);

  const getStatusBadge = (status: Sector['status']) => {
    if (status === 'bullish') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
          <TrendingUp className="w-3 h-3" /> Bullish
        </span>
      );
    }
    if (status === 'bearish') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[11px] font-bold">
          <TrendingDown className="w-3 h-3" /> Bearish Risk
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
        <Minus className="w-3 h-3" /> Neutral
      </span>
    );
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>24H Real-Time Market Heatmap</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white tracking-tight">
            AI Sector Intelligence Radar
          </h2>
          <p className="text-xs text-purple-300/70 max-w-xl">
            Click any market sector to reveal real-time AI sentiment scoring, key takeaways, and live ticker signals.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0d091f]/80 p-2 rounded-2xl border border-purple-500/20">
          <span className="text-xs font-bold text-white font-heading px-2">Overall Market Sentiment:</span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-heading">
            68% Moderate Bullish
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTORS.map((sector) => {
          const Icon = sector.icon;
          const isSelected = selectedSector.id === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector)}
              className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-purple-900/40 border-purple-400 shadow-xl shadow-purple-900/40 scale-[1.02]'
                  : 'bg-[#0d091f]/70 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-950/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white font-heading">{sector.name}</span>
                </div>
                {getStatusBadge(sector.status)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-purple-300/60 font-semibold">AI Sentiment Index</span>
                  <span className="text-white font-bold font-heading">{sector.score}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-950/80 overflow-hidden border border-purple-500/20">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sector.status === 'bullish'
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-sm shadow-emerald-500'
                        : sector.status === 'bearish'
                        ? 'bg-gradient-to-r from-rose-500 to-orange-400 shadow-sm shadow-rose-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-400 shadow-sm shadow-purple-500'
                    }`}
                    style={{ width: `${sector.score}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 pt-3 overflow-x-auto no-scrollbar">
                {sector.tickers.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-lg bg-[#06040f] border border-purple-500/20 text-[10px] font-bold text-purple-300 whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-[#090616] border border-purple-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-extrabold text-white font-heading">
              AI Executive Takeaways: <span className="text-purple-300">{selectedSector.name}</span>
            </h3>
          </div>
          <span className="text-xs font-semibold text-purple-300/70">
            Market Impact: <span className="text-white font-bold">{selectedSector.impact}</span>
          </span>
        </div>

        <div className="space-y-2.5">
          {selectedSector.takeaways.map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-purple-200/90 leading-relaxed bg-[#0d091f]/60 p-3 rounded-xl border border-purple-500/15">
              <span className="w-5 h-5 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
