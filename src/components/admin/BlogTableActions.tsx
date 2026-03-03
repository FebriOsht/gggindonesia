'use client';

import React, { useTransition } from 'react';
import { Trash2, Eye, Edit } from 'lucide-react';
// Menggunakan alias path standar Next.js untuk menghindari masalah resolusi relatif
import { deleteBlogPost, togglePublishStatus } from '@/lib/actions/blog';

/**
 * Komponen Client untuk menangani aksi interaktif di tabel manajemen blog.
 * Memperbaiki masalah impor aksi dengan menggunakan alias path '@'.
 */

interface BlogTableActionsProps {
  id: string;
  slug: string;
  published: boolean;
}

export default function BlogTableActions({ id, slug, published }: BlogTableActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = async () => {
    startTransition(async () => {
      try {
        await togglePublishStatus(id, published);
      } catch (error) {
        // Logging error ke konsol browser untuk keperluan debug
        console.error("Gagal mengubah status publikasi:", error);
      }
    });
  };

  const handleDelete = async () => {
    // Memberikan konfirmasi sebelum menghapus data permanen
    if (typeof window !== 'undefined' && window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      startTransition(async () => {
        try {
          await deleteBlogPost(id);
        } catch (error) {
          console.error("Gagal menghapus artikel:", error);
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      {/* Tombol Toggle Status (Published/Draft) */}
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
          published 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
            : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
        } disabled:opacity-50`}
      >
        {isPending ? '...' : (published ? 'PUBLISHED' : 'DRAFT')}
      </button>

      {/* Tombol Lihat Artikel di Sisi Publik */}
      <a 
        href={`/blog/${slug}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors" 
        title="Lihat di Website"
      >
        <Eye className="w-5 h-5" />
      </a>

      {/* Tombol Edit Artikel - Mengarah ke rute edit berbasis ID */}
      <a 
        href={`/admin/dashboard/blog/edit/${id}`} 
        className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
        title="Edit Artikel"
      >
        <Edit className="w-5 h-5" />
      </a>

      {/* Tombol Hapus Artikel */}
      <button 
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50" 
        title="Hapus Artikel"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}