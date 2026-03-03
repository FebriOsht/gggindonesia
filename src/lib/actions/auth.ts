'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email dan password wajib diisi.' };
  }

  // Validasi Keamanan: Pastikan hanya domain internal yang diizinkan
  if (!email.endsWith('@gggindonesia.com')) {
    return { success: false, message: 'Akses ditolak. Gunakan email @gggindonesia.com' };
  }

  try {
    // 1. Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: 'Email tidak terdaftar.' };
    }

    // 2. Verifikasi password dengan Bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Password salah.' };
    }

    // 3. Buat sesi (Token JWT)
    const expires = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 jam
    const session = await encrypt({ id: user.id, role: user.role, name: user.name });
    
    // 4. Simpan sesi di Cookies (HTTP-Only agar aman dari serangan XSS)
    (await
          // 4. Simpan sesi di Cookies (HTTP-Only agar aman dari serangan XSS)
          cookies()).set('session', session, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/',
      expires 
    });

    return { success: true, message: 'Login berhasil.' };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Terjadi kesalahan pada sistem.' };
  }
}

export async function logoutUser() {
  (await cookies()).delete('session');
}