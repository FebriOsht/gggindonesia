'use client';

import { useState, useTransition } from 'react';
import { loginUser } from '@/lib/actions/auth';
import { Lock, Mail, Loader2, LogIn, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Halaman Login Admin
 * Wajib menggunakan 'export default' agar tidak error saat build/deploy.
 */
export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      // Memanggil fungsi loginUser dari src/lib/actions/auth.ts
      const result = await loginUser(formData);
      
      // Jika loginUser mengembalikan object error (bukan redirect)
      if (result && !result.success) {
        setError(result.message || 'Terjadi kesalahan saat login.');
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Tombol Kembali ke Beranda */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-3xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              PT Gatha Gemilang Global Indonesia
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Perusahaan</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300"
                  placeholder="admin@gggindonesia.com"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Pesan Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 transition-all active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 italic">
              Akses terbatas hanya untuk personil yang berwenang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}