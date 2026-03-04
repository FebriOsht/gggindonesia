'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '1d' }
    );

    // 4. Simpan ke Cookie
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 hari
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan pada server.' };
  }

  // Redirect harus di luar block try-catch agar Next.js bisa menangani dengan benar
  redirect('/admin/dashboard/blog');
}

/**
 * Fungsi untuk Logout
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/admin/login');
}