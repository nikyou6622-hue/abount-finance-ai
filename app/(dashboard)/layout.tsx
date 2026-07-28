'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Rss, Bookmark, Settings, ShieldCheck, LogOut, User as UserIcon, UserPlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const navLinks = [
    { name: 'Live Stream', href: '/feed', icon: Rss },
    { name: 'Saved Bookmarks', href: '/saved', icon: Bookmark },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Admin', href: '/admin', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#080613]">
      <header className="sticky top-0 z-50 glass-panel border-b border-purple-500/20 px-4 md:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/feed" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d091f] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight font-heading text-white group-hover:text-purple-300 transition-colors">
                Abount <span className="text-gradient-neon">Finance AI</span>
              </span>
              <span className="text-[10px] block text-purple-400/60 font-semibold tracking-wider uppercase">
                Intelligence Stream
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5 bg-[#0d091f]/80 p-1.5 rounded-2xl border border-purple-500/20">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all ${
                    isActive
                      ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-md shadow-purple-900/40'
                      : 'text-purple-300/70 hover:text-white hover:bg-purple-950/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-purple-400/60'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white font-heading truncate max-w-[140px]">{user.email}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase">Subscriber</span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:bg-rose-500/20 hover:border-rose-500/40 text-purple-300/70 hover:text-rose-300 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/40 border border-purple-500/25 hover:border-purple-500/50 text-purple-200 hover:text-white text-xs font-bold font-heading transition-all">
                  <UserIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sign In</span>
                </Link>

                <Link href="/signup" className="flex items-center gap-1.5 px-4 py-2 rounded-xl glow-button-purple text-xs font-bold font-heading shadow-md shadow-purple-600/25 transition-all">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">{children}</main>

      <footer className="border-t border-purple-500/15 py-8 px-4 text-center text-xs text-purple-300/50 space-y-2 bg-[#06040f]">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-heading font-semibold text-slate-300">Abount Finance & AI Intelligence Engine</span>
        </div>
        <p>© 2026 Abount Finance AI — Powered by <span className="font-semibold text-purple-300">NikNeuron Infotech</span> | Next.js 14 & Supabase RLS</p>
      </footer>
    </div>
  );
}
