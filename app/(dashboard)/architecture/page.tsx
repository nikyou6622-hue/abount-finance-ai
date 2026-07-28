'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { Network, Sparkles, ExternalLink } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-2 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-1">
            <Network className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive System Topology</span>
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">System Architecture & Pipeline Topology</h1>
          <p className="text-xs text-purple-300/70 max-w-xl">
            Explorable interactive architecture diagram rendered with Archify. Trace request paths, news ingestion pipelines, and Supabase database boundaries.
          </p>
        </div>

        <a
          href="/architecture.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 glow-button-purple text-xs font-bold font-heading px-5 py-3 rounded-2xl whitespace-nowrap shadow-lg"
        >
          <span>Open Fullscreen Diagram</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="w-full h-[750px] rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl bg-[#06040f] relative">
        <iframe
          src="/architecture.html"
          title="Abount Finance AI Interactive System Architecture Diagram"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
