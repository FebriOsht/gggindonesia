'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Fungsi untuk Login Admin
 * Menangani verifikasi kredensial dan pembuatan session (cookie)
 */
export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Validasi input kosong
  if (!email || !password) {
    return { success: false, message: 'Email dan password wajib diisi.' };
  }

  try {
    // 2. Cari user di database berdasarkan email
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user) {
      return { success: false, message: 'Email atau password salah.' };
    }

    // 3. Verifikasi password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Email atau password salah.' };
    }

    // 4. Buat token keamanan (JWT)
    const token = sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1d' } // Token berlaku selama 1 hari
    );

    // 5. Simpan token ke dalam Cookie browser (Session)
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true, // Tidak bisa diakses oleh JavaScript client (aman)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan sistem. Silakan coba lagi.' };
  }

  // Jika berhasil, arahkan ke dashboard blog
  redirect('/admin/dashboard/blog');
}

/**
 * Fungsi untuk Logout
 * Menghapus sesi dan mengarahkan kembali ke halaman utama (/)
 */
export async function logout() {
  const cookieStore = await cookies();
  
  // Hapus cookie 'token'
  cookieStore.delete('token');
  
  // Sesuai permintaan: kembali ke halaman utama setelah logout
  redirect('/');
}