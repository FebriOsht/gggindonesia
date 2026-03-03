import { jwtVerify, SignJWT } from 'jose';

// Secret key diambil dari .env, dengan fallback untuk development
const secretKey = process.env.JWT_SECRET || 'gatha-gemilang-global-secret-key-2025';
const key = new TextEncoder().encode(secretKey);

// Fungsi untuk membuat Token/Session
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h') // Sesi admin berakhir dalam 8 jam
    .sign(key);
}

// Fungsi untuk membaca dan memverifikasi Token
export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // Jika token kedaluwarsa atau dimanipulasi, akan return null
    return null; 
  }
}