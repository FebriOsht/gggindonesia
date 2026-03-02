import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PT Gatha Gemilang Global - Eksportir Produk Premium Indonesia',
  description: 'Perusahaan ekspor terkemuka yang menghubungkan pasar global dengan produk-produk terbaik dari Indonesia. Spesialis kopi, pemanis alami, kelapa, pinang, dan sayuran segar.',
  keywords: 'ekspor indonesia, kopi indonesia, gula aren, molases, kelapa, pinang, sayuran segar, medan, sumatera utara',
  authors: [{ name: 'PT Gatha Gemilang Global' }],
  openGraph: {
    title: 'PT Gatha Gemilang Global - Eksportir Produk Premium Indonesia',
    description: 'Menghadirkan produk-produk terbaik Indonesia ke pasar global dengan kualitas dan standar internasional.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}