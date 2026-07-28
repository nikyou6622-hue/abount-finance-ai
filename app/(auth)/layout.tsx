import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080613] text-slate-100 flex flex-col justify-between p-4 md:p-8 relative">
      {/* Top Header Logo */}
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full z-10">
        <Link href="/feed" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-heading">
            Abount <span className="text-purple-400">Finance AI</span>
          </span>
        </Link>

        <Link href="/feed" className="inline-flex items-center gap-1.5 text-xs text-purple-300/70 hover:text-white font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </Link>
      </div>

      {/* Main Glass Card Container */}
      <div className="flex-1 flex items-center justify-center my-8 z-10">
        <div className="glass-panel-glow p-8 md:p-10 rounded-3xl border border-purple-500/30 w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-purple-300/40 z-10">
        © {new Date().getFullYear()} Abount Finance AI Intelligence Stream. All rights reserved.
      </div>
    </div>
  );
}
