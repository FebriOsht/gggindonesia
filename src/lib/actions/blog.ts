'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Server Action untuk membuat postingan blog baru.
 * Menangani pengunggahan file gambar fisik ke folder public/uploads.
 */
export async function createBlogPost(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  
  // Validasi dasar
  if (!title || !content || !slug) {
    throw new Error("Judul, Konten, dan Slug wajib diisi.");
  }

  // 1. PENANGANAN GAMBAR LOKAL
  const imageFile = formData.get('image') as File;
  let imageUrl = '';

  if (imageFile && imageFile.size > 0) {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
      const path = join(uploadDir, filename);

      await writeFile(path, buffer);
      imageUrl = `/uploads/${filename}`;
    } catch (error) {
      console.error("Gagal simpan gambar:", error);
    }
  }

  // 2. AMBIL AUTHOR (ADMIN)
  const author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    throw new Error("Gagal: Akun Admin tidak ditemukan. Pastikan sudah menjalankan seeding database.");
  }

  // 3. SIMPAN KE DATABASE
  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        category,
        excerpt,
        content,
        image: imageUrl,
        published,
        authorId: author.id,
      },
    });
  } catch (error: any) {
    console.error("DEBUG DATABASE ERROR:", error);
    if (error.code === 'P2002') {
      throw new Error(`Gagal: Slug '${slug}' sudah digunakan. Silakan gunakan judul artikel lain.`);
    }
    throw new Error("Gagal menyimpan ke database.");
  }

  // 4. REVALIDASI DAN REDIRECT
  revalidatePath('/admin/dashboard/blog');
  revalidatePath('/blog');
  redirect('/admin/dashboard/blog');
}

/**
 * Server Action untuk memperbarui postingan blog yang sudah ada.
 */
export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  if (!title || !content || !slug) {
    throw new Error("Judul, Konten, dan Slug wajib diisi.");
  }

  const imageFile = formData.get('image') as File;
  
  // Ambil data lama untuk mempertahankan gambar jika tidak ada upload baru
  const oldPost = await prisma.blogPost.findUnique({ where: { id } });
  if (!oldPost) throw new Error("Artikel tidak ditemukan.");

  let imageUrl = oldPost.image || '';

  if (imageFile && imageFile.size > 0) {
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;
      const path = join(uploadDir, filename);
      await writeFile(path, buffer);
      imageUrl = `/uploads/${filename}`;
    } catch (error) {
      console.error("Gagal update gambar:", error);
    }
  }

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        excerpt,
        content,
        image: imageUrl,
        published,
      },
    });
  } catch (error: any) {
    console.error("Update database error:", error);
    if (error.code === 'P2002') {
      throw new Error("Slug sudah digunakan oleh artikel lain.");
    }
    throw new Error("Gagal memperbarui artikel di database.");
  }

  revalidatePath('/admin/dashboard/blog');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  redirect('/admin/dashboard/blog');
}

/**
 * Server Action untuk menghapus artikel.
 */
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({ where: { id } });
    revalidatePath('/admin/dashboard/blog');
    revalidatePath('/blog');
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Gagal menghapus artikel.");
  }
}

/**
 * Server Action untuk mengubah status publikasi secara instan.
 */
export async function togglePublishStatus(id: string, currentStatus: boolean) {
  try {
    await prisma.blogPost.update({
      where: { id },
      data: { published: !currentStatus }
    });
    revalidatePath('/admin/dashboard/blog');
    revalidatePath('/blog');
  } catch (error) {
    console.error("Toggle status error:", error);
    throw new Error("Gagal mengubah status publikasi.");
  }
}