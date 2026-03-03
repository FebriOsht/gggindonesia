import React from 'react';
import prisma from '@/lib/prisma';
import { Plus, Search } from 'lucide-react';
import BlogTableActions from '@/components/admin/BlogTableActions';

/**
 * Halaman Manajemen Blog (Server Component)
 * Mengambil data dari database dan merender tabel.
 * Logika interaktif dipindahkan ke BlogTableActions.
 */
export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="p-8">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Manajemen Blog</h1>
          <p className="text-gray-500 mt-1">Kelola artikel, berita, dan wawasan perusahaan Anda.</p>
        </div>
        <a 
          href="/admin/dashboard/blog/create" 
          className="flex items-center px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tulis Artikel Baru
        </a>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari artikel..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-600">Judul Artikel</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Kategori</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Penulis</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Status & Aksi</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada artikel. Silakan buat artikel pertama Anda.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                      <div className="text-xs text-gray-500 mt-1">/{post.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{post.author.name}</td>
                    <td className="p-4">
                      {/* Panggil Client Component untuk menangani aksi */}
                      <BlogTableActions 
                        id={post.id} 
                        slug={post.slug} 
                        published={post.published} 
                      />
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}