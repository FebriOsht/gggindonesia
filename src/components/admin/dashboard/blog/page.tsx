'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';
import BlogForm from '@/components/admin/BlogForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function BlogManagement() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - would come from API
  const blogPosts = [
    {
      id: 1,
      title: 'Keistimewaan Kopi Arabika Gayo dari Aceh',
      excerpt: 'Menjelajahi karakteristik unik kopi Arabika Gayo...',
      category: 'Kopi',
      date: '2024-01-15',
      views: 234,
      status: 'published',
      author: 'admin@gggindonesia.com'
    },
    {
      id: 2,
      title: 'Proses Produksi Gula Aren Premium',
      excerpt: 'Mengenal proses tradisional pembuatan gula aren...',
      category: 'Pemanis Alami',
      date: '2024-01-10',
      views: 156,
      status: 'published',
      author: 'admin@gggindonesia.com'
    },
    {
      id: 3,
      title: 'Manfaat Molases Tebu untuk Industri',
      excerpt: 'Berbagai kegunaan molases tebu dalam industri...',
      category: 'Produk Tebu',
      date: '2024-01-05',
      views: 98,
      status: 'draft',
      author: 'admin@gggindonesia.com'
    },
    {
      id: 4,
      title: 'Potensi Ekspor Kelapa Indonesia',
      excerpt: 'Indonesia sebagai penghasil kelapa terbesar di dunia...',
      category: 'Kelapa',
      date: '2024-01-01',
      views: 187,
      status: 'published',
      author: 'admin@gggindonesia.com'
    },
    {
      id: 5,
      title: 'Standar Kualitas Ekspor Pinang',
      excerpt: 'Memahami standar kualitas dan grade pinang...',
      category: 'Pinang',
      date: '2023-12-28',
      views: 145,
      status: 'published',
      author: 'admin@gggindonesia.com'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSavePost = (data: any) => {
    console.log('Saving post:', data);
    setShowForm(false);
    setEditingPost(null);
    // Would save to API here
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      console.log('Deleting post:', id);
      // Would delete from API here
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-light">
        <Sidebar />
        <AdminHeader />
        
        <main className="ml-64 pt-16 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-primary">
              {editingPost ? 'Edit Blog Post' : 'Buat Blog Post Baru'}
            </h1>
            <Button variant="outline" onClick={() => {
              setShowForm(false);
              setEditingPost(null);
            }}>
              Kembali
            </Button>
          </div>

          <BlogForm 
            initialData={editingPost}
            onSubmit={handleSavePost}
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Sidebar />
      <AdminHeader />
      
      <main className="ml-64 pt-16 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-primary">
            Manajemen Blog
          </h1>
          <Button variant="primary" icon={Plus} onClick={() => setShowForm(true)}>
            Buat Postingan Baru
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari postingan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="all">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline" icon={Filter}>
                Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Blog Posts Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Judul</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Penulis</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-light/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-primary">{post.title}</p>
                        <p className="text-sm text-dark/60 truncate max-w-xs">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark/70">
                      {new Date(post.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-dark/70">{post.views}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark/70">{post.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye className="w-4 h-4 text-dark/60 hover:text-primary" />
                        </button>
                        <button 
                          onClick={() => handleEdit(post)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-dark/60 hover:text-primary" />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4 text-dark/60 hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark/60">Tidak ada postingan yang ditemukan.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-dark/60">
              Menampilkan 1-{filteredPosts.length} dari {filteredPosts.length} postingan
            </p>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-light transition-colors disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg">1</button>
              <button className="px-3 py-1 hover:bg-light rounded-lg">2</button>
              <button className="px-3 py-1 hover:bg-light rounded-lg">3</button>
              <button className="p-2 rounded-lg hover:bg-light transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}