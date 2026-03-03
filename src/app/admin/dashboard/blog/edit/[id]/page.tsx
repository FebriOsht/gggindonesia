import React from 'react';
import prisma from '@/lib/prisma';
import BlogForm from '@/components/admin/BlogForm';
import { updateBlogPost } from '@/lib/actions/blog';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit3, ShieldCheck } from 'lucide-react';

/**
 * Halaman Edit Artikel Blog (Server Component)
 * Mengambil data dari SQLite menggunakan Prisma dan merender Form Edit.
 */
export default async function EditBlogPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params karena di Next.js 15+ params adalah Promise
  const { id } = await params;

  // Mengambil data artikel berdasarkan ID
  const post = await prisma.blogPost.findUnique({
    where: { id }
  });

  // Jika artikel tidak ditemukan, tampilkan halaman 404
  if (!post) {
    notFound();
  }

  /**
   * Menggunakan .bind untuk meneruskan ID artikel ke Server Action updateBlogPost.
   * Ini adalah cara standar Next.js untuk meneruskan argumen tambahan ke action.
   */
  const updateActionWithId = updateBlogPost.bind(null, id);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigasi & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <a 
              href="/admin/dashboard/blog" 
              className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors mb-2 text-sm font-medium w-fit"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Manajemen Blog
            </a>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center tracking-tight">
              <Edit3 className="w-8 h-8 mr-3 text-emerald-600" />
              Edit Artikel
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-xs font-bold text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>ID: {id}</span>
          </div>
        </div>

        {/* Memanggil Komponen BlogForm dengan Data Awal */}
        <div className="relative">
          <BlogForm 
            action={updateActionWithId} 
            initialData={{
              ...post,
              excerpt: post.excerpt || '' // Memastikan excerpt tidak null untuk state form
            }} 
          />
        </div>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>Terakhir diperbarui pada {new Date(post.updatedAt).toLocaleString('id-ID')}</p>
        </div>
        
      </div>
    </div>
  );
}