'use client';

import React from 'react';
import { ChevronRight, Globe, Award, Ship } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Indonesian Coffee Plantation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-dark/70" />
      </div>

      <Container className="relative z-10 text-white pt-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Menghubungkan Indonesia dengan{' '}
            <span className="text-secondary">Dunia</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            PT Gatha Gemilang Global adalah perusahaan ekspor terkemuka yang 
            menghadirkan produk-produk premium Indonesia ke pasar internasional 
            dengan kualitas terbaik dan standar global.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button variant="secondary" size="lg" icon={ChevronRight}>
              Jelajahi Produk Kami
            </Button>
            <Button variant="outline" size="lg">
              Hubungi Kami
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-semibold text-lg">Jangkauan Global</h3>
                <p className="text-sm text-gray-300">Melayani pasar internasional</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-semibold text-lg">Kualitas Premium</h3>
                <p className="text-sm text-gray-300">Standar internasional</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Ship className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-semibold text-lg">Pengiriman Andal</h3>
                <p className="text-sm text-gray-300">Manajemen rantai pasok lengkap</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;