'use client';

import React, { useState } from 'react';
import { Save, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface BlogFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || 'Kopi',
    image: initialData?.image || '',
    published: initialData?.published || false
  });

  const categories = ['Kopi', 'Pemanis Alami', 'Kelapa', 'Pinang', 'Sayuran', 'Umum'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
    setFormData({ ...formData, slug });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2">
              Slug URL
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={generateSlug}
                className="whitespace-nowrap"
              >
                Generate Slug
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2">
              Ringkasan
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2">
              Konten
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={15}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
              required
            />
            <p className="text-sm text-dark/60 mt-2">
              Gunakan HTML tags untuk formatting: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, dll.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h3 className="font-semibold text-primary mb-4">Pengaturan Publikasi</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Gambar Featured
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <ImageIcon className="w-12 h-12 text-dark/40 mx-auto mb-2" />
                  <p className="text-sm text-dark/60 mb-2">
                    Drag & drop atau klik untuk upload
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                  <Button type="button" variant="outline" size="sm">
                    Pilih Gambar
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-dark">
                  Publikasikan
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" variant="primary" icon={Save} className="flex-1">
              Simpan
            </Button>
            <Button type="button" variant="outline" icon={X} onClick={onCancel}>
              Batal
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;