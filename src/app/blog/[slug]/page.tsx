import React from 'react';
// Menggunakan jalur relatif untuk menghindari masalah resolusi alias path (@/)
import prisma from '../../../lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Link from 'next/link';

/**
 * Halaman Detail Artikel Publik.
 * Menggunakan parser Markdown sederhana agar tampilan konten memiliki hierarki visual (H1, H2, Bold, List).
 */
export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Menangani params sebagai Promise sesuai standar Next.js terbaru (v15+)
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post) notFound();

  // Fungsi Parser untuk mengubah simbol Markdown menjadi elemen HTML yang rapi
  const formatArticleContent = (text: string) => {
    return text
      // Menangani Judul Utama (H1) - ditandai dengan # 
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-extrabold mb-6 mt-10 text-gray-900 tracking-tight leading-tight">$1</h1>')
      // Menangani Sub-Judul (H2) - ditandai dengan ##
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl md:text-3xl font-bold mb-4 mt-8 text-emerald-800 tracking-tight border-b border-gray-100 pb-3">$1</h2>')
      // Menangani Daftar/List - ditandai dengan * di awal baris
      .replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc mb-2 text-gray-700 pl-2">$1</li>')
      // Menangani Teks Tebal - ditandai dengan **teks**
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-gray-900">$1</strong>')
      // Menangani Teks Miring - ditandai dengan *teks*
      .replace(/\*(.*)\*/gim, '<em class="italic text-gray-800">$1</em>')
      // Menangani Baris Baru
      .replace(/\n/gim, '<br />');
  };

  return (
    <>
      <Header />
      <article className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Navigasi Kembali ke Blog */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-emerald-600 font-bold mb-10 hover:translate-x-1 transition-transform group"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Blog
          </Link>
          
          <header className="mb-12">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-8 border-b border-gray-100">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                {new Date(post.createdAt).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-emerald-600" />
                Diterbitkan oleh {post.author.name}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                Insight GGG
              </div>
            </div>
          </header>

          {/* Gambar Utama Artikel */}
          {post.image && (
            <div className="w-full aspect-video mb-16 rounded-[48px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}

          {/* Area Konten Utama - Render HTML dari Parser Markdown */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="blog-content prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed font-sans text-lg"
              dangerouslySetInnerHTML={{ __html: formatArticleContent(post.content) }}
            />
          </div>

          {/* Bagian Penutup / Bio Penulis */}
          <div className="mt-24 p-8 md:p-12 bg-gray-50 rounded-[40px] border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Author: {post.author.name}</h4>
              <p className="text-gray-500 leading-relaxed font-light">
                Export commodity specialist at PT Gatha Gemilang Global. Focuses on developing international market strategies and supply chain management of superior Indonesian products.
              </p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}