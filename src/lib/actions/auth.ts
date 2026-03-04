'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Fungsi untuk Login Admin
 */
export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email dan password wajib diisi.' };
  }

  try {
    // 1. Cari user di database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { success: false, message: 'Email atau password salah.' };
    }

    // 2. Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Email atau password salah.' };
    }

    // 3. Buat token JWT
    // Pastikan JWT_SECRET di Vercel sama dengan yang di lokal
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key-ggg-2026',
      { expiresIn: '1d' }
    );

    // 4. Simpan ke Cookie
    const cookieStore = await cookies();
    
    /**
     * PERBAIKAN KRITIS UNTUK VERCEL:
     * 1. 'secure: true' wajib untuk HTTPS Vercel.
     * 2. 'sameSite: lax' atau 'strict' agar cookie terkirim saat navigasi.
     * 3. 'path: /' agar bisa diakses di semua folder admin.
     */
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

    /**
     * Revalidasi menyeluruh:
     * Kita hapus cache layout admin agar Next.js mengecek ulang cookie 
     * sebelum memutuskan halaman mana yang akan ditampilkan.
     */
    revalidatePath('/', 'layout');
    revalidatePath('/admin', 'layout');
    revalidatePath('/admin/dashboard/blog');

  } catch (error: any) {
    // Jangan tangkap error redirect
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  }

  // Redirect akhir
  redirect('/admin/dashboard/blog');
}

/**
 * Fungsi untuk Logout
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  
  // Bersihkan semua cache agar tidak bisa di-"Back"
  revalidatePath('/', 'layout');
  revalidatePath('/admin', 'layout');
  
  redirect('/admin/login');
}