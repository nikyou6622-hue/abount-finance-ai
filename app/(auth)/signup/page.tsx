'use client';

export const dynamic = 'force-dynamic';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [digestFrequency, setDigestFrequency] = useState('daily');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        await supabase.from('user_preferences').insert({
          user_id: data.user.id,
          email_digest: true,
          digest_frequency: digestFrequency,
        });
      }

      setSuccessMessage('Account created successfully! Redirecting to feed...');
      setTimeout(() => {
        router.push('/feed');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during account creation.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Join Abount AI Intelligence Stream</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">Create Subscriber Account</h1>
        <p className="text-xs text-purple-300/70">Unlock 24H financial intelligence, AI sentiment signals & morning digests</p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1 font-heading">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jhon Person"
              className="w-full bg-[#0d091f]/90 border border-purple-500/25 focus:border-purple-500 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-purple-300/40 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1 font-heading">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-[#0d091f]/90 border border-purple-500/25 focus:border-purple-500 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-purple-300/40 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1 font-heading">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full bg-[#0d091f]/90 border border-purple-500/25 focus:border-purple-500 rounded-xl pl-11 pr-11 py-3 text-xs text-white placeholder:text-purple-300/40 outline-none transition-all"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400/70 hover:text-purple-200">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-1 font-heading">Email Digest Preference</label>
          <select
            value={digestFrequency}
            onChange={(e) => setDigestFrequency(e.target.value)}
            className="w-full bg-[#0d091f]/90 border border-purple-500/25 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
          >
            <option value="daily">Daily Morning Market Briefing (Recommended)</option>
            <option value="weekly">Weekly Financial Summary Digest</option>
            <option value="off">No Automated Email Digest</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="w-full glow-button-purple text-xs font-extrabold font-heading py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Create Subscriber Account</span>}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-purple-300/60">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-300 hover:text-white font-bold transition-colors">Sign In Here</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12 text-purple-300">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
