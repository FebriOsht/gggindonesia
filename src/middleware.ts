import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

// Middleware ini bertugas sebagai "Satpam" yang berjalan di Edge Server
// untuk mengecek cookie sebelum halaman admin sempat dimuat.
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/admin/dashboard');
  const isLoginRoute = path === '/admin/login';

  // Ambil cookie sesi
  const cookie = request.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Jika mencoba masuk ke dashboard tanpa login (atau sesi habis)
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Jika sudah login tapi mencoba kembali ke halaman login, arahkan ke dashboard
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin/dashboard/blog', request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware ini pada rute admin
export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login'],
};