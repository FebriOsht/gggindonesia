import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, User, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const BlogSection = () => {
  // This would typically come from an API/database
  const posts = [
    {
      id: 1,
      title: 'Keistimewaan Kopi Arabika Gayo dari Aceh',
      excerpt: 'Menjelajahi karakteristik unik kopi Arabika Gayo yang terkenal dengan body kuat dan rasa earthy dengan sentuhan cokelat.',
      author: 'Tim GGG',
      date: '2024-01-15',
      image: '/images/blog/gayo-coffee.jpg',
      category: 'Kopi',
      readTime: 5
    },
    {
      id: 2,
      title: 'Proses Produksi Gula Aren Premium',
      excerpt: 'Mengenal proses tradisional pembuatan gula aren berkualitas ekspor dari nira pohon aren pilihan.',
      author: 'Tim GGG',
      date: '2024-01-10',
      image: '/images/blog/palm-sugar.jpg',
      category: 'Pemanis Alami',
      readTime: 4
    },
    {
      id: 3,
      title: 'Manfaat Molases Tebu untuk Industri',
      excerpt: 'Berbagai kegunaan molases tebu dalam industri pangan, pakan ternak, dan pertanian organik.',
      author: 'Tim GGG',
      date: '2024-01-05',
      image: '/images/blog/molasses.jpg',
      category: 'Produk Tebu',
      readTime: 6
    }
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Blog & Artikel Terbaru</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Dapatkan wawasan dan informasi terbaru seputar produk ekspor Indonesia dan industri perdagangan internasional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-dark/60 mb-3">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('id-ID')}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-dark/70 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark/60">{post.readTime} menit baca</span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-secondary font-semibold flex items-center hover:underline"
                  >
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="lg" icon={ChevronRight}>
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;