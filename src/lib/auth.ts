import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'gatha-gemilang-global-secret-key-2025';
const SALT_ROUNDS = 10;

/**
 * Hash password menggunakan bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Gagal mengenkripsi password');
  }
};

/**
 * Membandingkan password plain dengan hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('Gagal memverifikasi password');
  }
};

/**
 * Generate JWT token
 */
export const generateToken = (payload: any): string => {
  try {
    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: '7d' // Token berlaku 7 hari
    });
  } catch (error) {
    throw new Error('Gagal membuat token');
  }
};

/**
 * Verifikasi JWT token
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Mendapatkan user dari token (untuk middleware/API routes)
 */
export const getUserFromToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded) return null;
    
    // Ambil data user dari database (opsional, bisa langsung return decoded)
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    return user;
  } catch (error) {
    return null;
  }
};

/**
 * Middleware untuk memproteksi API routes
 */
export const withAuth = (handler: Function, allowedRoles: string[] = ['ADMIN', 'EDITOR']) => {
  return async (req: Request, ...args: any[]) => {
    try {
      // Ambil token dari header Authorization
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized - No token provided' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      if (!decoded) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized - Invalid token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Cek role
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return new Response(
          JSON.stringify({ error: 'Forbidden - Insufficient permissions' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Tambahkan user ke request
      (req as any).user = decoded;

      // Lanjutkan ke handler
      return handler(req, ...args);
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
};

/**
 * Helper untuk mendapatkan token dari cookies (untuk client components)
 */
export const getTokenFromCookies = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return value;
    }
  }
  return null;
};

/**
 * Set token ke cookies (untuk login)
 */
export const setTokenCookie = (token: string): void => {
  if (typeof document === 'undefined') return;
  
  // Set cookie yang expires dalam 7 hari
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  
  document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
};

/**
 * Hapus token dari cookies (untuk logout)
 */
export const removeTokenCookie = (): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};