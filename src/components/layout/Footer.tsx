'use client';

import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Globe, 
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 pb-10 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img src="/img/gggindonesia.png" alt="GGG Logo" className="h-14 w-auto brightness-125" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              A premier export trading company from Indonesia, connecting global markets with the finest products from across the archipelago. We are your dependable and effective sourcing partner.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 flex items-center">
              Our Commodities
              <span className="ml-2 w-8 h-px bg-emerald-600"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/#arabica" scroll={false} className="hover:text-emerald-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Premium Coffee
                </Link>
              </li>
              <li>
                <Link href="/#molasses" scroll={false} className="hover:text-emerald-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Natural Sweeteners
                </Link>
              </li>
              <li>
                <Link href="/#coconut" scroll={false} className="hover:text-emerald-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Coconut Products
                </Link>
              </li>
              <li>
                <Link href="/#betel-nut" scroll={false} className="hover:text-emerald-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                  Betel Nut & Vegetables
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 flex items-center">
              Quick Links
              <span className="ml-2 w-8 h-px bg-emerald-600"></span>
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/#why-us" className="hover:text-emerald-400 transition-colors">Values & Mission</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Insights & News</Link></li>
              <li><Link href="/#contact" className="hover:text-emerald-400 transition-colors text-emerald-500 font-bold">Contact Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 flex items-center">
              Office Location
              <span className="ml-2 w-8 h-px bg-emerald-600"></span>
            </h4>
            <div className="space-y-6 text-sm">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-4 text-emerald-500 flex-shrink-0" />
                <p className="leading-relaxed">
                  Jalan Amplas 14a/31,<br />
                  Medan - North Sumatra,<br />
                  Indonesia 20212
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-4 text-emerald-500 flex-shrink-0" />
                <a href="https://wa.me/628126451588" className="hover:text-white transition-colors">+62 812 6451 588</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-4 text-emerald-500 flex-shrink-0" />
                <a href="mailto:admin@gggindonesia.com" className="hover:text-white transition-colors">admin@gggindonesia.com</a>
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <a href="https://linkedin.com/in/gathagemilangglobal" target="_blank" className="p-2 bg-white/5 hover:bg-emerald-600 hover:text-white rounded-lg transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/gathagemilangglobal" target="_blank" className="p-2 bg-white/5 hover:bg-emerald-600 hover:text-white rounded-lg transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <div className="flex items-center px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase text-gray-500">
                  <Globe className="w-3 h-3 mr-1" /> ID / EN
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-xs font-medium text-gray-600 flex items-center text-center">
            <span>© {currentYear} PT Gatha Gemilang Global. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}