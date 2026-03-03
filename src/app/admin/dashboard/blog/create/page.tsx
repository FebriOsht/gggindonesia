import React from 'react';
import BlogForm from '@/components/admin/BlogForm';
import { createBlogPost } from '@/lib/actions/blog';
import { ArrowLeft, LayoutDashboard, Globe, ShieldCheck } from 'lucide-react';

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Atas / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Tombol Kembali menggunakan tag <a> untuk stabilitas preview */}
            <a 
              href="/admin/dashboard/blog" 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <div className="flex items-center text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                <LayoutDashboard className="w-3 h-3 mr-1" />
                <span>Admin</span>
                <span className="mx-2">/</span>
                <Globe className="w-3 h-3 mr-1" />
                <span>Blog</span>
                <span className="mx-2">/</span>
                <span className="text-emerald-600">Buat Baru</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                Editor Artikel Profesional
                <span className="ml-3 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  SECURE MODE
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-400 italic">
            Mendukung pengunggahan gambar lokal...
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Komponen Form Utama */}
        <div className="relative">
          <BlogForm action={createBlogPost} />
        </div>

        {/* Tips Cepat untuk Admin GGG */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center">
              💡 Tips Konten
            </h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Gunakan judul yang mengandung kata kunci utama produk (misal: "Kopi Arabika") untuk meningkatkan visibilitas di Google.
            </p>
          </div>
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-2 flex items-center">
              📸 Optimasi Gambar
            </h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              Pastikan gambar utama memiliki rasio 16:9 agar terlihat profesional di halaman depan website.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h4 className="font-bold text-purple-900 mb-2 flex items-center">
              🔗 Struktur Slug
            </h4>
            <p className="text-sm text-purple-700 leading-relaxed">
              Slug dibuat otomatis dari judul. Anda bisa mengeditnya di tab SEO untuk membuatnya lebih pendek dan padat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}