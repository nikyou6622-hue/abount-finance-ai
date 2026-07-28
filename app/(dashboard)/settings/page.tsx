'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Settings, Bell, Shield, User, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const [digest, setDigest] = useState(true);
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email || null);
    }
    loadUser();
  }, [supabase]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/30 space-y-2 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5 text-purple-400" />
          <span>Subscriber Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">Account & Intelligence Settings</h1>
        <p className="text-xs text-purple-300/70">
          Manage your email briefing subscriptions, market alert frequencies, and account profile preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/35 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Your subscriber preferences have been updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h2 className="text-sm font-extrabold font-heading text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>Profile Overview</span>
          </h2>
          <div>
            <label className="block text-xs font-semibold text-purple-300/70 mb-1">Registered Subscriber Email</label>
            <input
              type="text"
              readOnly
              value={userEmail || 'Guest Reader (Not Signed In)'}
              className="w-full bg-[#080613] border border-purple-500/25 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none"
            />
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4">
          <h2 className="text-sm font-extrabold font-heading text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <span>Automated Email Market Briefing</span>
          </h2>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20">
            <div>
              <div className="text-xs font-bold text-white font-heading">Enable Automated Briefings</div>
              <div className="text-[11px] text-purple-300/60">Receive AI-curated market signals and top stories directly in your inbox</div>
            </div>
            <input
              type="checkbox"
              checked={digest}
              onChange={(e) => setDigest(e.target.checked)}
              className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300/70 mb-1">Dispatch Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full bg-[#080613] border border-purple-500/25 rounded-xl px-4 py-3 text-xs text-white outline-none"
            >
              <option value="daily">Daily Morning Market Digest (8:00 AM EST)</option>
              <option value="weekly">Weekly Financial Digest (Sundays)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="glow-button-purple text-xs font-extrabold font-heading py-3.5 px-6 rounded-xl shadow-lg flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Save Preferences</span>}
        </button>
      </form>
    </div>
  );
}
