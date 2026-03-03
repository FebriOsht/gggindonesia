'use client';

import React, { useState, useTransition, useRef } from 'react';
import { 
  Save, 
  Settings, 
  FileText, 
  Loader2,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Eye
} from 'lucide-react';

/**
 * FILE: src/components/admin/BlogForm.tsx
 * PERBAIKAN: Menambahkan '| null' pada initialData agar tidak error saat build.
 */

interface BlogFormProps {
  action: (formData: FormData) => void;
  initialData?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    category: string;
    published: boolean;
    image: string | null;
  } | null; // Menerima null untuk kompatibilitas state editing
}

export default function BlogForm({ action, initialData }: BlogFormProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'content' | 'preview' | 'seo'>('content');
  
  // Menggunakan optional chaining (?.) untuk menangani data yang mungkin null atau undefined
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}${prefix}${selectedText}${suffix}${after}`;
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialData) {
      const generatedSlug = val.toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const renderPreviewHTML = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mb-4 mt-6 text-gray-900 border-b pb-2">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-5 text-gray-800">$1</h2>')
      .replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc mb-1 text-gray-700">$1</li>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic text-gray-800">$1</em>')
      .replace(/\n/gim, '<br />');
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      startTransition(() => action(formData));
    }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button type="button" onClick={() => setActiveTab('content')} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${activeTab === 'content' ? 'text-emerald-600 bg-white border-b-2 border-emerald-600' : 'text-gray-400'}`}>
              <FileText className="w-4 h-4" /> <span>Edit Konten</span>
            </button>
            <button type="button" onClick={() => setActiveTab('preview')} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${activeTab === 'preview' ? 'text-emerald-600 bg-white border-b-2 border-emerald-600' : 'text-gray-400'}`}>
              <Eye className="w-4 h-4" /> <span>Cek Tampilan</span>
            </button>
            <button type="button" onClick={() => setActiveTab('seo')} className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${activeTab === 'seo' ? 'text-emerald-600 bg-white border-b-2 border-emerald-600' : 'text-gray-400'}`}>
              <Settings className="w-4 h-4" /> <span>SEO & URL</span>
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className={activeTab !== 'content' ? 'hidden' : 'space-y-6 animate-in fade-in duration-300'}>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Judul Artikel</label>
                <input name="title" type="text" required value={title} onChange={handleTitleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-xl font-bold text-gray-900" placeholder="Contoh: Mengapa Kopi Gayo Begitu Spesial?" />
              </div>

              <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 rounded-xl border border-gray-200">
                <button type="button" onClick={() => insertMarkdown('# ', '')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600 hover:text-emerald-600" title="Judul Utama (H1)"><Heading1 className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertMarkdown('## ', '')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600 hover:text-emerald-600" title="Sub Judul (H2)"><Heading2 className="w-4 h-4" /></button>
                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                <button type="button" onClick={() => insertMarkdown('**', '**')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600 hover:text-emerald-600" title="Tebal (Bold)"><Bold className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertMarkdown('*', '*')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600 hover:text-emerald-600" title="Miring (Italic)"><Italic className="w-4 h-4" /></button>
                <button type="button" onClick={() => insertMarkdown('* ', '')} className="p-2 hover:bg-white rounded-lg transition-all text-gray-600 hover:text-emerald-600" title="Daftar List"><List className="w-4 h-4" /></button>
              </div>

              <div>
                <textarea
                  ref={textareaRef}
                  name="content"
                  required
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-mono text-sm leading-relaxed text-gray-700"
                  placeholder="Gunakan toolbar untuk merapikan isi artikel Anda..."
                ></textarea>
              </div>
            </div>

            <div className={activeTab !== 'preview' ? 'hidden' : 'animate-in fade-in duration-300'}>
              <div className="prose prose-emerald max-w-none bg-gray-50 p-6 md:p-10 rounded-[32px] border border-gray-100 min-h-[500px]">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-900 leading-tight">{title || 'Judul Kosong'}</h1>
                <div 
                  className="text-gray-700 leading-[1.8] text-lg font-sans"
                  dangerouslySetInnerHTML={{ __html: renderPreviewHTML(content) }} 
                />
              </div>
            </div>

            <div className={activeTab !== 'seo' ? 'hidden' : 'space-y-6 animate-in fade-in duration-300'}>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Slug URL (Alamat Link)</label>
                <div className="flex items-center px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl">
                  <span className="text-gray-400 text-sm font-mono mr-1">/blog/</span>
                  <input name="slug" type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 bg-transparent font-mono text-sm text-emerald-700 font-bold outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ringkasan Pendek (Excerpt)</label>
                <textarea name="excerpt" rows={4} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" placeholder="Tulis ringkasan singkat artikel ini..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 space-y-5 sticky top-24">
          <h3 className="font-bold text-gray-900 flex items-center text-lg">
            <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" /> Publikasi
          </h3>
          <button type="submit" disabled={isPending} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center disabled:opacity-50">
            {isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            {initialData ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
          </button>
          
          <div className="pt-4 border-t border-gray-100 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kategori</span>
              <select name="category" defaultValue={initialData?.category || 'Coffee'} className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg outline-none cursor-pointer">
                <option value="Coffee">Coffee</option>
                <option value="Sweeteners">Sweeteners</option>
                <option value="Coconut">Coconut</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibilitas</span>
              <select name="published" defaultValue={initialData?.published ? 'true' : 'false'} className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg outline-none cursor-pointer">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Gambar Utama</label>
              <div onClick={() => fileInputRef.current?.click()} className="aspect-video bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-emerald-400 cursor-pointer overflow-hidden relative group shadow-inner">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="text-white w-6 h-6" />
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Pilih Gambar</span>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} name="image" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
          <a href="/admin/dashboard/blog" className="block text-center text-sm font-bold text-gray-400 hover:text-red-500 py-2 transition-colors">Batalkan</a>
        </div>
      </div>
    </form>
  );
}