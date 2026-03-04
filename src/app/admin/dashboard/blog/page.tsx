import React from 'react';
import prisma from '@/lib/prisma';
import { Plus, Search, LogOut, FileText, Calendar, User, Tag } from 'lucide-react';
import BlogTableActions from '@/components/admin/BlogTableActions';
import { logout } from '@/lib/actions/auth';

/**
 * Halaman Manajemen Blog (Server Component)
 * Mengambil data postingan dari database dan menampilkan tabel pengelolaan.
 */
export default async function AdminBlogPage() {
  // Mengambil semua artikel dari database, diurutkan dari yang terbaru
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Bagian Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Blog</h1>
          <p className="text-gray-500 mt-1 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Kelola artikel, berita, dan wawasan perusahaan GGG Indonesia.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Tombol Logout (Menggunakan Server Action dalam Form) */}
          <form action={logout} className="flex-1 md:flex-none">
            <button 
              type="submit"
              className="w-full flex items-center justify-center px-5 py-2.5 bg-white text-red-600 font-semibold rounded-xl border border-red-100 hover:bg-red-50 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Keluar
            </button>
          </form>

          {/* Tombol Tulis Artikel Baru */}
          <a 
            href="/admin/dashboard/blog/create" 
            className="flex-1 md:flex-none flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tulis Artikel
          </a>
        </div>
      </div>

      {/* Bar Pencarian (Visual Only) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari judul artikel..." 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Container Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Judul Artikel</div>
                </th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center"><Tag className="w-4 h-4 mr-2" /> Kategori</div>
                </th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center"><User className="w-4 h-4 mr-2" /> Penulis</div>
                </th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Status & Aksi</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Tanggal</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium text-lg">Belum ada artikel yang dibuat.</p>
                      <p className="text-gray-400 text-sm mt-1">Silakan klik tombol "Tulis Artikel" untuk memulai.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 font-mono">/{post.slug}</div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                        {post.category || 'Umum'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {post.author.name}
                    </td>
                    <td className="p-4">
                      <BlogTableActions 
                        id={post.id} 
                        slug={post.slug} 
                        published={post.published} 
                      />
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Statis */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} PT Gatha Gemilang Global Indonesia - Panel Admin v1.0
        </p>
      </div>
    </div>
  );
}