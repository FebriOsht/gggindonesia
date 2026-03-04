'use client';

import { useState, useTransition } from 'react';
import { loginUser } from '@/lib/actions/auth';
import { Lock, Mail, Loader2, LogIn, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginUser(formData);
      
      if (result && !result.success) {
        setError(result.message || 'Terjadi kesalahan saat login.');
      }
    });
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Sisi Kiri - Branding dengan Background Image (Disembunyikan di Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden justify-center items-center">
        
        {/* Gambar Latar Belakang (Silakan ganti src dengan path gambar Anda) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/img/hero.png" 
            alt="Background Admin" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Gelap: Memastikan teks tetap terbaca meskipun gambarnya terang */}
          <div className="absolute inset-0 bg-emerald-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent"></div>
        </div>

        {/* Konten Teks di Atas Gambar */}
        <div className="relative z-10 p-12 max-w-lg text-white">
          {/* Tempat Logo Perusahaan */}
          <div className="mb-8">
            <img 
              src="/img/gggindonesia.png" 
              alt="Logo Gatha Gemilang Global" 
              className="h-26 w-auto drop-shadow-xl"
              // Jika belum ada logo, bisa berikan style display: none sementara
            />
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-lg">
            Gatha Gemilang Global <br/> <span className="text-emerald-300">Admin Portal</span>
          </h1>
          <p className="text-emerald-50 text-lg leading-relaxed mb-10 drop-shadow-md font-medium">
            Pusat kendali manajemen konten, data komoditas, dan interaksi klien untuk pasar global.
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-emerald-100 font-semibold bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 w-max shadow-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Sistem Terenkripsi & Terlindungi</span>
          </div>
        </div>
      </div>

      {/* Sisi Kanan - Form Login */}
      <div className="flex-1 flex flex-col justify-center relative py-12 px-6 sm:px-12 lg:px-20 xl:px-24">
        {/* Tombol Kembali ke Beranda */}
        <div className="absolute top-8 left-6 sm:left-12 lg:left-20">
          <Link 
            href="/" 
            className="group flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-all font-medium"
          >
            <span className="p-2 rounded-full bg-gray-50 group-hover:bg-emerald-50 mr-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </span>
            Kembali ke Website
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm mt-12 lg:mt-0">
          {/* Header untuk tampilan Mobile (Menampilkan Logo juga) */}
          <div className="mb-10 lg:hidden text-center flex flex-col items-center">
             <img 
              src="/logo.png" 
              alt="Logo GGG" 
              className="h-14 w-auto mb-4"
            />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">PT Gatha Gemilang Global</p>
          </div>

          <div className="hidden lg:block mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Selamat Datang</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Silakan masukkan kredensial Anda untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Akses</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400 font-medium"
                  placeholder="admin@gggindonesia.com"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kata Sandi</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400 font-medium tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Pesan Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-600/20 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Mengautentikasi...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Masuk ke Panel Admin
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} PT Gatha Gemilang Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}