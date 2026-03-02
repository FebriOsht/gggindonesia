import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Container } from '../ui/Container';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">GGG Indonesia</h3>
            <p className="text-gray-300 mb-4">
              Perusahaan ekspor terkemuka yang menghubungkan pasar global dengan produk-produk terbaik dari Indonesia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-secondary transition-colors">Beranda</Link></li>
              <li><Link href="#products" className="text-gray-300 hover:text-secondary transition-colors">Produk</Link></li>
              <li><Link href="#about" className="text-gray-300 hover:text-secondary transition-colors">Tentang Kami</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-secondary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              <li><Link href="#coffee" className="text-gray-300 hover:text-secondary transition-colors">Kopi Premium</Link></li>
              <li><Link href="#sweeteners" className="text-gray-300 hover:text-secondary transition-colors">Pemanis Alami</Link></li>
              <li><Link href="#coconut" className="text-gray-300 hover:text-secondary transition-colors">Produk Kelapa</Link></li>
              <li><Link href="#others" className="text-gray-300 hover:text-secondary transition-colors">Pinang & Sayuran</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <span className="text-gray-300">Jalan Amplas 14a/31 Medan - Sumatera Utara, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">+62 812 6451 588</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:Hendra.GGG.ID@gmail.com" className="text-gray-300 hover:text-secondary transition-colors">
                  Hendra.GGG.ID@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} PT Gatha Gemilang Global. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            NIB: 0611250135091 | NPWP: 1000 0000 0641 8583 | SK Kemenkumham: AHU-061665.AH.01.30.Tahun 2025
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;