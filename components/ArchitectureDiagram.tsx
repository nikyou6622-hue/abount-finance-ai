'use client';

import React, { useState } from 'react';
import { Layers, Database, Shield, Zap, RefreshCw, Cpu, Radio, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const CHAPTERS = [
  {
    id: 'all',
    title: 'Full System Architecture',
    desc: 'Complete end-to-end topology showing client edge, serverless engine, database, and background scraper pipelines.',
    activeNodes: ['readers', "admin_user", 'cdn_edge', 'next_app', 'supabase_db', 'supabase_auth', 'news_sources', 'ai_sentiment', 'email_dispatcher'],
  },
  {
    id: 'public',
    title: '1. Public Market Stream Flow',
    desc: '24-Hour real-time news delivery from Supabase PostgreSQL via Next.js 14 App Router and Vercel Edge CDN.',
    activeNodes: ['readers', 'cdn_edge', 'next_app', 'supabase_db'],
  },
  {
    id: 'ingestion',
    title: '2. News Ingestion & AI Sentiment',
    desc: 'Multi-source RSS & Reddit ingestion engine with SHA-256 deduplication and AI sentiment classifier.',
    activeNodes: ['news_sources', 'next_app', 'ai_sentiment', 'supabase_db'],
  },
  {
    id: 'admin',
    title: '3. Admin Control & Auth',
    desc: 'Maxton Dark Management Panel, role-based controls, audit logs, and automated morning briefing dispatches.',
    activeNodes: ['admin_user', 'supabase_auth', 'next_app', 'email_dispatcher'],
  },
];

export default function ArchitectureDiagram() {
  const [activeChapter, setActiveChapter] = useState('all');

  const currentChapter = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];

  const isNodeActive = (id: string) => currentChapter.activeNodes.includes(id);

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Archify Topology Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white tracking-tight">
            Abount Finance AI Architecture
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-heading whitespace-nowrap transition-all ${
                activeChapter === ch.id
                  ? 'bg-purple-600/40 text-white border border-purple-500/60 shadow-lg shadow-purple-900/50'
                  : 'bg-purple-950/40 border border-purple-500/20 text-purple-300/70 hover:text-white'
              }`}
            >
              {ch.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#0a0718] border border-purple-500/20 text-xs text-purple-200/80 flex items-center gap-3">
        <Radio className="w-4 h-4 text-cyan-400 flex-shrink-0 animate-pulse" />
        <span>{currentChapter.desc}</span>
      </div>

      <div className="relative w-full rounded-2xl border border-purple-500/25 bg-[#06040f] p-6 md:p-8 overflow-hidden min-h-[440px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 items-center">
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('readers') ? 'bg-purple-950/70 border-cyan-400/60 shadow-lg shadow-cyan-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-heading">
                <Layers className="w-4 h-4" /> Market Readers
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">Browser / Mobile Web App</div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('admin_user') ? 'bg-purple-950/70 border-purple-400/60 shadow-lg shadow-purple-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold font-heading">
                <Shield className="w-4 h-4" /> Admin Console
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">Maxton Dark Dashboard</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('cdn_edge') ? 'bg-purple-950/70 border-cyan-400/60 shadow-lg shadow-cyan-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-heading">
                <Zap className="w-4 h-4" /> Vercel Edge CDN
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">Global Caching & SSL</div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('supabase_auth') ? 'bg-purple-950/70 border-emerald-400/60 shadow-lg shadow-emerald-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-heading">
                <Shield className="w-4 h-4" /> Supabase Auth
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">JWT & Cookie Session</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('next_app') ? 'bg-purple-950/80 border-purple-400/70 shadow-xl shadow-purple-500/30' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-purple-300 text-xs font-bold font-heading">
                <Cpu className="w-4 h-4" /> Next.js 14 Engine
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">React Server Components</div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('news_sources') ? 'bg-purple-950/70 border-amber-400/60 shadow-lg shadow-amber-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-heading">
                <RefreshCw className="w-4 h-4" /> News Feed Sources
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">FT / MarketWatch / Reddit</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('supabase_db') ? 'bg-purple-950/80 border-emerald-400/70 shadow-xl shadow-emerald-500/30' : 'bg-[#0d091f]/50 border-emerald-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-heading">
                <Database className="w-4 h-4" /> Supabase PostgreSQL
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">RLS Protected Database</div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${isNodeActive('ai_sentiment') ? 'bg-purple-950/70 border-pink-400/60 shadow-lg shadow-pink-500/20' : 'bg-[#0d091f]/50 border-purple-500/15 opacity-40'}`}>
              <div className="flex items-center gap-2 text-pink-400 text-xs font-bold font-heading">
                <Sparkles className="w-4 h-4" /> AI Sentiment Classifier
              </div>
              <div className="text-[11px] text-purple-300/70 pt-1">Bullish / Bearish Engine</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-1">
          <div className="text-xs font-bold text-cyan-400 font-heading">Edge & Frontend</div>
          <p className="text-[11px] text-cyan-200/70">Vercel Edge CDN fronts static assets & Next.js App Router rendering</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
          <div className="text-xs font-bold text-emerald-400 font-heading">Database & Security</div>
          <p className="text-[11px] text-emerald-200/70">Supabase PostgreSQL relational storage with Row Level Security (RLS)</p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 space-y-1">
          <div className="text-xs font-bold text-purple-400 font-heading">AI & Ingestion Engine</div>
          <p className="text-[11px] text-purple-200/70">Multi-feed RSS / Reddit JSON deduplication pipeline & sentiment score</p>
        </div>
      </div>
    </div>
  );
}
