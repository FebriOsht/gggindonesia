import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware ini berfungsi sebagai filter keamanan di sisi Edge (Vercel).
 * Kita akan menyelaraskan nama cookie dengan yang ada di auth.ts (yaitu 'token').
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Tentukan rute mana yang harus dilindungi
  const isProtectedRoute = path.startsWith('/admin/dashboard');
  const isLoginRoute = path === '/admin/login';

  // AMBIL COOKIE DENGAN NAMA 'token' (Sesuai dengan auth.ts)
  const token = request.cookies.get('token')?.value;

  // 1. Jika mencoba akses dashboard tapi tidak ada token
  if (isProtectedRoute && !token) {
    // Arahkan paksa ke halaman login
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Jika sudah ada token tapi mencoba buka halaman login lagi
  if (isLoginRoute && token) {
    // Arahkan langsung ke dashboard agar tidak login dua kali
    const dashboardUrl = new URL('/admin/dashboard/blog', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 3. Izinkan akses jika kondisi di atas tidak terpenuhi
  return NextResponse.next();
}

/**
 * Konfigurasi rute mana saja yang akan diawasi oleh Middleware ini
 */
export const config = {
  matcher: [
    /*
     * Jalankan middleware pada semua rute di bawah /admin/dashboard
     * dan juga pada halaman /admin/login itu sendiri.
     */
    '/admin/dashboard/:path*', 
    '/admin/login'
  ],
};