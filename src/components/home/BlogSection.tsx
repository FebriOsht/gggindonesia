import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Calendar, User, ArrowRight, Inbox } from 'lucide-react';

/**
 * Komponen BlogSection (Server Component)
 * Menampilkan 3 artikel terbaru yang sudah dipublikasikan dari database.
 */
export default async function BlogSection() {
  // Mengambil 3 artikel terbaru dari Prisma
  const recentPosts = await prisma.blogPost.findMany({
    where: { 
      published: true 
    },
    orderBy: { 
      createdAt: 'desc' 
    },
    take: 3, // Hanya ambil 3 artikel teratas
    include: { 
      author: true 
    }
  });

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Insights & News
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Stay updated with the latest trends in Indonesian agriculture exports, commodity insights, and company news.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
          >
            View All Articles 
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Grid */}
        {recentPosts.length === 0 ? (
          <div className="bg-gray-50 rounded-3xl p-16 text-center border border-dashed border-gray-200">
            <Inbox className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Belum ada artikel yang diterbitkan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col transform hover:-translate-y-1">
                
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-10 bg-emerald-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Inbox className="w-10 h-10" />
                    </div>
                  )}
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-[10px] font-bold text-gray-400 mb-4 space-x-4 uppercase tracking-widest">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1.5 text-emerald-600" /> 
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center">
                      <User className="w-3 h-3 mr-1.5 text-emerald-600" /> 
                      {post.author.name}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
                    {post.excerpt || 'Read our latest update on Indonesian agriculture and global market trends.'}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 mt-auto group/link"
                  >
                    Read More 
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}