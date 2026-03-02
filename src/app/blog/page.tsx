import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

// This would typically come from an API/database
const blogPosts = [
  {
    id: 1,
    title: 'Keistimewaan Kopi Arabika Gayo dari Aceh',
    excerpt: 'Menjelajahi karakteristik unik kopi Arabika Gayo yang terkenal dengan body kuat dan rasa earthy dengan sentuhan cokelat. Kopi ini telah menjadi favorit para pecinta kopi di seluruh dunia.',
    content: '',
    author: 'Tim GGG',
    date: '2024-01-15',
    image: '/images/blog/gayo-coffee.jpg',
    category: 'Kopi',
    readTime: 5
  },
  {
    id: 2,
    title: 'Proses Produksi Gula Aren Premium',
    excerpt: 'Mengenal proses tradisional pembuatan gula aren berkualitas ekspor dari nira pohon aren pilihan. Dari pengumpulan nira hingga pengemasan akhir.',
    content: '',
    author: 'Tim GGG',
    date: '2024-01-10',
    image: '/images/blog/palm-sugar.jpg',
    category: 'Pemanis Alami',
    readTime: 4
  },
  {
    id: 3,
    title: 'Manfaat Molases Tebu untuk Industri',
    excerpt: 'Berbagai kegunaan molases tebu dalam industri pangan, pakan ternak, dan pertanian organik. Produk ini kaya akan mineral dan nutrisi.',
    content: '',
    author: 'Tim GGG',
    date: '2024-01-05',
    image: '/images/blog/molasses.jpg',
    category: 'Produk Tebu',
    readTime: 6
  },
  {
    id: 4,
    title: 'Potensi Ekspor Kelapa Indonesia',
    excerpt: 'Indonesia sebagai penghasil kelapa terbesar di dunia memiliki potensi ekspor yang luar biasa. Berbagai produk turunan kelapa sangat diminati pasar global.',
    content: '',
    author: 'Tim GGG',
    date: '2024-01-01',
    image: '/images/blog/coconut.jpg',
    category: 'Kelapa',
    readTime: 7
  },
  {
    id: 5,
    title: 'Standar Kualitas Ekspor Pinang',
    excerpt: 'Memahami standar kualitas dan grade pinang untuk pasar internasional. Mulai dari kadar air hingga pola internal yang menentukan harga.',
    content: '',
    author: 'Tim GGG',
    date: '2023-12-28',
    image: '/images/blog/betel-nut.jpg',
    category: 'Pinang',
    readTime: 5
  },
  {
    id: 6,
    title: 'Tips Memilih Sayuran Segar Berkualitas Ekspor',
    excerpt: 'Panduan memilih sayuran segar yang memenuhi standar ekspor. Dari kesegaran, ukuran, hingga kemasan yang tepat.',
    content: '',
    author: 'Tim GGG',
    date: '2023-12-20',
    image: '/images/blog/vegetables.jpg',
    category: 'Sayuran',
    readTime: 4
  }
];

const categories = ['Semua', 'Kopi', 'Pemanis Alami', 'Kelapa', 'Pinang', 'Sayuran'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');

  const filteredPosts = selectedCategory === 'Semua' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary to-dark text-white">
        <Container>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Blog & Artikel
          </h1>
          <p className="text-xl max-w-3xl text-gray-200">
            Dapatkan wawasan dan informasi terbaru seputar produk ekspor Indonesia, 
            industri perdagangan internasional, dan perkembangan terbaru dari GGG.
          </p>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-light">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg transform scale-105'
                    : 'bg-white text-dark hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-secondary transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
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

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-dark/60">Tidak ada artikel dalam kategori ini.</p>
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
}