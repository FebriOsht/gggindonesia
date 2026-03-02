'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock, Share2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// This would typically come from an API/database
const blogPosts = {
  '1': {
    id: 1,
    title: 'Keistimewaan Kopi Arabika Gayo dari Aceh',
    content: `
      <p>Kopi Arabika Gayo merupakan salah satu kopi terbaik yang berasal dari dataran tinggi Gayo, Aceh. Kopi ini telah dikenal di seluruh dunia karena karakteristik uniknya yang sulit ditemukan di daerah lain.</p>
      
      <h2>Karakteristik Kopi Gayo</h2>
      <p>Kopi Gayo memiliki beberapa karakteristik yang membuatnya istimewa:</p>
      <ul>
        <li><strong>Body yang kuat dan kental</strong> - Memberikan sensasi tekstur yang kaya di mulut</li>
        <li><strong>Rasa earthy yang khas</strong> - Ciri khas kopi Sumatra yang ditanam di tanah vulkanik</li>
        <li><strong>Sentuhan cokelat dan rempah</strong> - Memberikan kompleksitas rasa yang unik</li>
        <li><strong>After taste yang panjang</strong> - Meninggalkan kesan yang tahan lama</li>
        <li><strong>Keasaman rendah</strong> - Cocok untuk mereka yang sensitif terhadap asam</li>
      </ul>
      
      <h2>Proses Penanaman dan Pengolahan</h2>
      <p>Kopi Gayo ditanam di ketinggian 1.200-1.600 mdpl dengan sistem naungan alami dari pohon-pohon besar. Proses pengolahan yang umum digunakan adalah metode full-washed dan semi-washed yang menghasilkan karakter kopi yang bersih dan konsisten.</p>
      
      <h2>Nilai Ekonomi dan Ekspor</h2>
      <p>Kopi Gayo telah menjadi primadona ekspor kopi Indonesia. Pembeli utama berasal dari Amerika Serikat, Eropa, dan Asia Timur. Dengan sistem perdagangan langsung dan sertifikasi fair trade, petani kopi Gayo mendapatkan harga yang lebih baik untuk produk berkualitas mereka.</p>
      
      <h2>Tips Menyeduh Kopi Gayo</h2>
      <p>Untuk mendapatkan pengalaman terbaik menikmati kopi Gayo, kami merekomendasikan:</p>
      <ul>
        <li>Giling kasar untuk metode manual brew</li>
        <li>Suhu air 88-92°C</li>
        <li>Rasio kopi dan air 1:15-1:17</li>
        <li>Waktu seduh 3-4 menit</li>
      </ul>
    `,
    excerpt: 'Menjelajahi karakteristik unik kopi Arabika Gayo yang terkenal dengan body kuat dan rasa earthy dengan sentuhan cokelat.',
    author: 'Tim GGG',
    authorEmail: 'blog@gggindonesia.com',
    date: '2024-01-15',
    image: '/images/blog/gayo-coffee.jpg',
    category: 'Kopi',
    readTime: 5
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <Layout>
        <section className="pt-32 pb-16 min-h-screen">
          <Container>
            <h1 className="text-4xl font-bold text-primary mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-xl text-dark/70 mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
            <Link href="/blog">
              <Button variant="primary">Kembali ke Blog</Button>
            </Link>
          </Container>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary to-dark text-white">
        <Container>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-secondary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-200">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(post.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {post.readTime} menit baca
            </span>
            <span className="bg-secondary px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="relative h-96 -mt-16">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Content */}
      <section className="py-20 bg-light">
        <Container>
          <div className="max-w-3xl mx-auto">
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share & Author */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark/60">Ditulis oleh:</p>
                  <p className="font-semibold text-primary">{post.author}</p>
                  <a 
                    href={`mailto:${post.authorEmail}`}
                    className="text-secondary text-sm hover:underline"
                  >
                    {post.authorEmail}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-dark/60">Bagikan:</span>
                  <button className="text-primary hover:text-secondary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}