'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Fungsi untuk Login Admin
 * Menangani verifikasi kredensial dan pembuatan session (cookie)
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
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1d' }
    );

    // 4. Simpan ke Cookie
    const cookieStore = await cookies();
    
    // Pengaturan cookie yang dioptimalkan untuk Vercel (Production)
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: true, // Wajib true di Vercel (HTTPS)
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

    /**
     * PENTING: Menggunakan 'layout' sebagai tipe revalidasi akan membersihkan 
     * semua cache di bawah direktori /admin, termasuk middleware dan state.
     * Ini menyelesaikan masalah URL berubah tapi konten tetap di halaman login.
     */
    revalidatePath('/admin', 'layout');
    revalidatePath('/admin/dashboard/blog');

  } catch (error) {
    // Pastikan redirect tidak tertangkap sebagai error oleh blok catch
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  }

  // Redirect akhir ke dashboard
  redirect('/admin/dashboard/blog');
}

/**
 * Fungsi untuk Logout
 * Membersihkan sesi dan memaksa refresh cache agar tidak bisa di-"Back"
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  
  // Bersihkan semua cache admin saat keluar
  revalidatePath('/admin', 'layout');
  revalidatePath('/admin/dashboard/blog');
  revalidatePath('/admin/login');
  
  redirect('/admin/login');
}