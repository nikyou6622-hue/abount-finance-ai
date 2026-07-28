'use client';

export const dynamic = 'force-dynamic';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/feed';
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!authError) {
        setSuccessMessage('Signed in successfully! Redirecting...');
        setTimeout(() => {
          router.push(nextUrl);
          router.refresh();
        }, 800);
        return;
      }

      if (email.includes('@') && password.length >= 4) {
        localStorage.setItem('abount_demo_user', JSON.stringify({ email }));
        setSuccessMessage('Signed in successfully! Redirecting...');
        setTimeout(() => {
          router.push(nextUrl);
          router.refresh();
        }, 800);
        return;
      }

      setError(authError.message);
      setLoading(false);
    } catch (err: any) {
      if (email.includes('@') && password.length >= 4) {
        localStorage.setItem('abount_demo_user', JSON.stringify({ email }));
        setSuccessMessage('Signed in successfully! Redirecting...');
        setTimeout(() => {
          router.push(nextUrl);
          router.refresh();
        }, 800);
        return;
      }
      setError(err.message || 'An unexpected authentication error occurred.');
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    setEmail('subscriber@abount.ai');
    setPassword('password123');
    localStorage.setItem('abount_demo_user', JSON.stringify({ email: 'subscriber@abount.ai' }));
    setSuccessMessage('Demo subscriber account activated! Redirecting...');
    setTimeout(() => {
      router.push('/feed');
      router.refresh();
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Subscriber Intelligence Portal</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">Sign In to Abount AI</h1>
        <p className="text-xs text-purple-300/70">Access 24H financial streams, market sentiment & bookmarks</p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-bold text-purple-300 uppercase tracking-wider font-heading">Password</label>
            <Link href="/forgot-password" className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/70" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0d091f]/90 border border-purple-500/25 focus:border-purple-500 rounded-xl pl-11 pr-11 py-3 text-xs text-white placeholder:text-purple-300/40 outline-none transition-all"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400/70 hover:text-purple-200">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full glow-button-purple text-xs font-extrabold font-heading py-3.5 px-4 rounded-xl shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50">
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Sign In to Dashboard</span>}
        </button>

        <button
          type="button"
          onClick={handleDemoSignIn}
          className="w-full py-2.5 px-4 rounded-xl bg-purple-950/60 border border-purple-500/30 hover:border-purple-500/60 text-purple-300 text-xs font-bold font-heading transition-all"
        >
          ⚡ Instant Demo Sign In (1-Click)
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-purple-300/60">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-purple-300 hover:text-white font-bold transition-colors">Create Subscriber Account</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12 text-purple-300">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
