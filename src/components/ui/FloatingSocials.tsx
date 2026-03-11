'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Linkedin, Instagram, Mail, ChevronUp } from 'lucide-react';

export default function FloatingSocials() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Menangani visibilitas tombol "Scroll to Top"
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Jangan tampilkan di panel admin
  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed right-0 top-[60%] transform -translate-y-1/2 z-[100] flex flex-col shadow-2xl">
      {/* LinkedIn */}
      <a 
        href="https://linkedin.com/in/gathagemilangglobal" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 md:w-12 md:h-12 bg-[#0a66c2] text-white flex items-center justify-center hover:bg-[#084e96] hover:w-14 transition-all duration-300 shadow-sm" 
        title="LinkedIn"
      >
        <Linkedin className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      </a>
      
      {/* Instagram */}
      <a 
        href="https://instagram.com/gathagemilangglobal" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:w-14 transition-all duration-300 shadow-sm" 
        title="Instagram"
      >
        <Instagram className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      </a>
      
      {/* Email */}
      <a 
        href="mailto:admin@gggindonesia.com" 
        className="w-10 h-10 md:w-12 md:h-12 bg-[#ea4335] text-white flex items-center justify-center hover:bg-[#c53929] hover:w-14 transition-all duration-300 shadow-sm" 
        title="Email"
      >
        <Mail className="w-5 h-5 md:w-[22px] md:h-[22px]" />
      </a>

      {/* WhatsApp */}
      <a 
        href="https://wa.me/628126451588" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1da851] hover:w-14 transition-all duration-300 shadow-sm" 
        title="WhatsApp"
      >
         <svg className="w-5 h-5 md:w-[22px] md:h-[22px]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
         </svg>
      </a>

      {/* Scroll to Top */}
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="w-10 h-10 md:w-12 md:h-12 bg-[#f1f5f9] text-[#0a66c2] flex items-center justify-center hover:bg-[#e2e8f0] transition-colors duration-300 shadow-sm"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}