import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Calendar, ArrowRight, Search, Inbox } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function BlogPage() {
  // Mengambil data artikel asli dari database Prisma
  const posts = await prisma.blogPost.findMany({
    where: { 
      published: true 
    },
    orderBy: { 
      createdAt: 'desc' 
    },
    include: { 
      author: true 
    }
  });

  // Menghitung jumlah kategori secara dinamis dari data yang ada
  const categories = posts.reduce((acc: {[key: string]: number}, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  const categoryList = Object.entries(categories).map(([name, count]) => ({
    name,
    count
  }));

  return (
    <>
      {/* Navbar Fixed */}
      <Header />

      <main className="min-h-screen bg-gray-50 pb-20">
        
        {/* Blog Page Hero Section - Menggunakan gggblog.png dengan visibilitas yang ditingkatkan */}
        <div className="relative bg-emerald-950 text-white pt-24 md:pt-32 pb-20 md:pb-28 mb-16 overflow-hidden shadow-xl">
          {/* Background Image Overlay - Diperbarui ke gggblog.png dan opacity dinaikkan sedikit agar lebih jelas */}
          <div 
            className="absolute inset-0 bg-[url('/img/gggblog.png')] bg-cover bg-center opacity-40 scale-105"
          ></div>
          
          {/* Gradient Overlay yang disesuaikan agar gambar di belakang lebih terlihat */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/50 to-emerald-900/80"></div>
          
          {/* Ornamen Cahaya Samping */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-emerald-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block drop-shadow-sm">
              PT Gatha Gemilang Global
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-md text-white">
              Our Blog & Insights
            </h1>
            <p className="text-base md:text-xl text-emerald-50 max-w-2xl mx-auto mb-10 font-normal leading-relaxed px-4 drop-shadow-sm">
              Explore the latest news, market trends, and deep dives into Indonesia's finest agricultural commodities.
            </p>
            
            {/* Search Bar yang lebih ramping */}
            <div className="max-w-xl mx-auto relative group px-4">
              <input 
                type="text" 
                placeholder="Search articles or news..." 
                className="w-full px-6 py-4 rounded-full text-gray-900 bg-white shadow-2xl outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-300 placeholder-gray-400"
              />
              <button className="absolute right-6 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-full transition-all flex items-center font-bold shadow-md hover:scale-105 active:scale-95">
                <Search className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
          
          {/* Main Article Grid */}
          <div className="lg:w-2/3">
            {posts.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300 shadow-sm">
                <Inbox className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Belum ada artikel</h3>
                <p className="text-gray-500 mt-2">Silakan tambahkan artikel baru melalui dashboard admin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col transform hover:-translate-y-2">
                    
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <div className="absolute top-4 left-4 z-10 bg-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-lg tracking-wider uppercase">
                        {post.category}
                      </div>
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Inbox className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-gray-400 mb-4 font-semibold uppercase tracking-widest">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                        {new Date(post.createdAt).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3 flex-grow font-light">
                        {post.excerpt || 'Explore deeper insights about this commodity in our latest update.'}
                      </p>
                      
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 mt-auto group/link"
                      >
                        Read Full Article 
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            
            {/* Categories Widget */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 font-sans tracking-tight">Categories</h3>
              <ul className="space-y-3">
                {categoryList.length === 0 ? (
                  <li className="text-sm text-gray-400 italic">No categories found</li>
                ) : (
                  categoryList.map((cat) => (
                    <li key={cat.name}>
                      <button className="w-full flex justify-between items-center p-3.5 rounded-xl hover:bg-emerald-50 group transition-all text-left border border-transparent hover:border-emerald-100">
                        <span className="text-gray-700 font-semibold group-hover:text-emerald-700">{cat.name}</span>
                        <span className="bg-gray-100 text-gray-500 group-hover:bg-emerald-600 group-hover:text-white py-1 px-3 rounded-lg text-xs font-bold transition-all">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Contact Banner Widget */}
            <div className="bg-emerald-600 rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden group">
              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-emerald-700 opacity-50 group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold mb-4 leading-tight">Looking for Premium Commodities?</h3>
                <p className="text-emerald-100 mb-8 text-base leading-relaxed font-light">
                  Get in touch with us to discuss your export needs, specifications, and request product samples.
                </p>
                <Link href="/#contact" className="block w-full py-4 bg-white text-emerald-800 font-extrabold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 transform duration-300">
                  Contact Us Now
                </Link>
              </div>
            </div>
            
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}