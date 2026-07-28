'use client';

export const dynamic = 'force-dynamic';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-white tracking-tight">Reset Password</h1>
        <p className="text-xs text-purple-300/70">Enter your email to receive a password recovery link</p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="p-6 bg-purple-950/60 border border-purple-500/30 rounded-3xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">Recovery Email Sent</h3>
          <p className="text-xs text-purple-300/70">
            We sent a password reset link to <span className="font-bold text-white">{email}</span>. Please check your inbox.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white pt-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
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

          <button type="submit" disabled={loading} className="w-full glow-button-purple text-xs font-extrabold font-heading py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Send Recovery Link</span>}
          </button>

          <div className="text-center pt-2">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-purple-300/70 hover:text-white font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-purple-300">Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
