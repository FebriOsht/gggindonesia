'use client';

import React from 'react';
import { 
  FileText, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const stats = [
    { icon: FileText, label: 'Total Blog Posts', value: '24', change: '+12%', color: 'bg-blue-500' },
    { icon: Users, label: 'Pengunjung Bulan Ini', value: '1,234', change: '+8%', color: 'bg-green-500' },
    { icon: ShoppingBag, label: 'Produk', value: '18', change: '0%', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Kunjungan Halaman', value: '5,678', change: '+23%', color: 'bg-orange-500' },
  ];

  const recentPosts = [
    { id: 1, title: 'Keistimewaan Kopi Arabika Gayo', views: 234, date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Proses Produksi Gula Aren Premium', views: 156, date: '2024-01-10', status: 'Published' },
    { id: 3, title: 'Manfaat Molases Tebu untuk Industri', views: 98, date: '2024-01-05', status: 'Draft' },
  ];

  return (
    <div className="min-h-screen bg-light">
      <Sidebar />
      <AdminHeader />
      
      <main className="ml-64 pt-16 p-8">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary mb-1">{stat.value}</h3>
              <p className="text-dark/60">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Blog Posts */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary">Blog Posts Terbaru</h2>
                <Button variant="outline" size="sm">Lihat Semua</Button>
              </div>
              
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-light rounded-lg">
                    <div>
                      <h3 className="font-semibold text-primary mb-1">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-dark/60">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views} views
                        </span>
                        <span>{new Date(post.date).toLocaleDateString('id-ID')}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'Published' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-dark/60 hover:text-primary" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-dark/60 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-primary mb-6">Aksi Cepat</h2>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start">
                  <FileText className="w-5 h-5 mr-2" />
                  Buat Blog Post Baru
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Tambah Produk
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-5 h-5 mr-2" />
                  Kelola Pengguna
                </Button>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Info Website</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark/60">Total Pengunjung:</span>
                  <span className="font-semibold">5,678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Blog Posts:</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Produk:</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark/60">Last Update:</span>
                  <span className="font-semibold">15 Jan 2024</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}