'use client';

import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Coffee, Droplet, Palmtree, Leaf } from 'lucide-react';
import Image from 'next/image';

const Products = () => {
  const [activeTab, setActiveTab] = useState('coffee');

  const tabs = [
    { id: 'coffee', name: 'Kopi Premium', icon: Coffee },
    { id: 'sweeteners', name: 'Pemanis Alami', icon: Droplet },
    { id: 'coconut', name: 'Produk Kelapa', icon: Palmtree },
    { id: 'others', name: 'Pinang & Sayuran', icon: Leaf },
  ];

  const coffeeProducts = {
    arabica: {
      title: 'Kopi Arabika Indonesia',
      description: 'Dihargai karena rasa yang kompleks dan bernuansa, ditanam di dataran tinggi Sumatera, Jawa, Sulawesi, dan Bali.',
      origins: [
        {
          region: 'Gayo',
          notes: 'Earthy, Chocolate, Citric Notes, Nutty, Herbal, Spicy',
          body: 'Strong, Robust Body, Medium Acidity'
        },
        {
          region: 'Mandheling',
          notes: 'Earthy, Spicy, Cocoa, Chocolate, Licorice, Sweet Finish',
          body: 'Full, Syrupy Body, Low Acidity'
        },
        {
          region: 'Java',
          notes: 'Rich, Chocolate, Earthy, Molasses, Clove, Fig, Cedar, Cinnamon',
          body: 'Heavy Body, Low Acidity'
        },
        {
          region: 'Lintong',
          notes: 'Earthy Cedar, Dark Chocolate, Sweet Tobacco, Herbaceous Spices',
          body: 'Heavy Body, Low Acidity'
        }
      ],
      grades: 'Grade 1 (Specialty), Grade 2, Grade 3',
      processing: 'Full / Semi-Washed',
      image: '/images/arabica.jpg'
    },
    robusta: {
      title: 'Kopi Robusta Indonesia',
      description: 'Dikenal karena kekuatan dan karakter yang berani, tumbuh subur di daerah dataran rendah seperti Lampung dan Jawa.',
      origins: [
        {
          region: 'Lampung',
          notes: 'Strong, Earthy, More Bitter, Intense',
          body: 'Full Body, Low Acidity'
        },
        {
          region: 'Sidikalang',
          notes: 'Earthy, Spicy, Hot, Fresh',
          body: 'Full Body'
        },
        {
          region: 'Temanggung',
          notes: 'Earthy, Caramel, Woody',
          body: 'Full Body, Low Acidity'
        }
      ],
      grades: 'Grade 3',
      processing: 'Full / Semi-Washed',
      image: '/images/robusta.jpg'
    }
  };

  return (
    <section id="products" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Produk Premium Kami</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Menghadirkan produk-produk terbaik Indonesia dengan kualitas ekspor dan standar internasional
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-light text-dark hover:bg-primary/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Coffee Products */}
        {activeTab === 'coffee' && (
          <div className="space-y-16">
            {/* Arabica */}
            <div>
              <h3 className="text-3xl font-display font-bold text-primary mb-8">
                {coffeeProducts.arabica.title}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-lg text-dark/80 mb-6">
                    {coffeeProducts.arabica.description}
                  </p>
                  <div className="bg-light p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-primary mb-2">Spesifikasi Produk:</h4>
                    <p className="mb-2"><span className="font-semibold">Grade:</span> {coffeeProducts.arabica.grades}</p>
                    <p className="mb-2"><span className="font-semibold">Metode Pengolahan:</span> {coffeeProducts.arabica.processing}</p>
                    <p><span className="font-semibold">Syarat Pembayaran:</span> T/T atau Irrevocable LC At Sight</p>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
                  <Image
                    src={coffeeProducts.arabica.image}
                    alt="Kopi Arabika"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h4 className="text-xl font-semibold text-primary mb-4">Varian Asal Daerah:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coffeeProducts.arabica.origins.map((origin, index) => (
                  <Card key={index} className="p-6">
                    <h5 className="text-lg font-semibold text-secondary mb-2">{origin.region}</h5>
                    <p className="text-sm text-dark/70 mb-2">
                      <span className="font-semibold">Catatan Rasa:</span> {origin.notes}
                    </p>
                    <p className="text-sm text-dark/70">
                      <span className="font-semibold">Body & Acidity:</span> {origin.body}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Robusta */}
            <div>
              <h3 className="text-3xl font-display font-bold text-primary mb-8">
                {coffeeProducts.robusta.title}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-lg text-dark/80 mb-6">
                    {coffeeProducts.robusta.description}
                  </p>
                  <div className="bg-light p-6 rounded-lg mb-6">
                    <h4 className="font-semibold text-primary mb-2">Spesifikasi Produk:</h4>
                    <p className="mb-2"><span className="font-semibold">Grade:</span> {coffeeProducts.robusta.grades}</p>
                    <p className="mb-2"><span className="font-semibold">Metode Pengolahan:</span> {coffeeProducts.robusta.processing}</p>
                    <p><span className="font-semibold">Syarat Pembayaran:</span> T/T atau Irrevocable LC At Sight</p>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
                  <Image
                    src={coffeeProducts.robusta.image}
                    alt="Kopi Robusta"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h4 className="text-xl font-semibold text-primary mb-4">Varian Asal Daerah:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coffeeProducts.robusta.origins.map((origin, index) => (
                  <Card key={index} className="p-6">
                    <h5 className="text-lg font-semibold text-secondary mb-2">{origin.region}</h5>
                    <p className="text-sm text-dark/70 mb-2">
                      <span className="font-semibold">Catatan Rasa:</span> {origin.notes}
                    </p>
                    <p className="text-sm text-dark/70">
                      <span className="font-semibold">Body & Acidity:</span> {origin.body}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sweeteners */}
        {activeTab === 'sweeteners' && (
          <div className="space-y-12">
            {/* Molasses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-display font-bold text-primary mb-4">
                  Pure Sugarcane Molasses
                </h3>
                <p className="text-lg text-dark/80 mb-6">
                  Molases tebu murni adalah sirup kental, gelap, kaya nutrisi yang diproduksi 
                  dengan merebus jus tebu dan menghilangkan kristal gula. 100% alami, mengandung 
                  kalsium, zat besi, kalium, magnesium, dan mangan dalam jumlah tinggi.
                </p>
                <div className="bg-light p-6 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Spesifikasi Produk:</h4>
                  <ul className="space-y-2 text-dark/80">
                    <li><span className="font-semibold">Bentuk:</span> Liquid</li>
                    <li><span className="font-semibold">Brix:</span> 80.6%</li>
                    <li><span className="font-semibold">Total Sugar Invert:</span> 55%</li>
                    <li><span className="font-semibold">Density:</span> 1.4kg/Ltr</li>
                    <li><span className="font-semibold">Kemasan:</span> Drum, IBC, Flexibag</li>
                    <li><span className="font-semibold">Kapasitas Produksi:</span> 10.000 MT per Tahun</li>
                    <li><span className="font-semibold">Asal:</span> Indonesia</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/molasses.jpg"
                  alt="Molases Tebu"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Palm Sugar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1 relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/palm-sugar.jpg"
                  alt="Gula Aren Premium"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-display font-bold text-primary mb-4">
                  Premium Palm Sugar
                </h3>
                <p className="text-lg text-dark/80 mb-6">
                  Gula aren premium adalah pemanis alami kaya mineral yang berasal dari nira pohon aren, 
                  diproduksi terutama di Asia Tenggara, khususnya Indonesia. Alternatif yang lebih sehat 
                  dari gula tebu dengan indeks glikemik lebih rendah, rasa karamel, dan digunakan dalam 
                  bentuk cair, butiran, atau balok.
                </p>
                <div className="bg-light p-6 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Spesifikasi Produk:</h4>
                  <ul className="space-y-2 text-dark/80">
                    <li><span className="font-semibold">Bahan Baku:</span> Nira aren</li>
                    <li><span className="font-semibold">Rasa:</span> Manis dengan sentuhan karamel</li>
                    <li><span className="font-semibold">Warna:</span> Cokelat Keemasan</li>
                    <li><span className="font-semibold">Bentuk:</span> Cetakan, bubuk (sesuai permintaan)</li>
                    <li><span className="font-semibold">Kemasan:</span> Sesuai permintaan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coconut Products */}
        {activeTab === 'coconut' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <Palmtree className="w-16 h-16 text-secondary mb-4" />
              <h3 className="text-2xl font-display font-bold text-primary mb-4">
                Produk Kelapa Premium
              </h3>
              <p className="text-dark/80 mb-6">
                Berasal dari pesisir tropis Indonesia yang subur, produk kelapa kami diproses 
                dengan standar kebersihan yang ketat untuk mempertahankan kesegaran alami, 
                minyak, dan nilai gizinya.
              </p>
              <div className="space-y-2 text-dark/80">
                <p><span className="font-semibold">Bentuk:</span> Kopra, Kelapa Utuh</p>
                <p><span className="font-semibold">Ukuran:</span> Sesuai Permintaan</p>
                <p><span className="font-semibold">Kemasan:</span> Sesuai Permintaan</p>
              </div>
            </Card>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/coconut.jpg"
                alt="Produk Kelapa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Betel Nut & Vegetables */}
        {activeTab === 'others' && (
          <div className="space-y-12">
            {/* Betel Nut */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-display font-bold text-primary mb-4">
                  Pinang Premium
                </h3>
                <p className="text-lg text-dark/80 mb-6">
                  Kami mengekspor biji pinang kering matahari berkualitas premium. Dipilih 
                  dan diproses dengan hati-hati, pinang kami memiliki pola internal dan kadar 
                  air yang sangat baik, melayani beragam permintaan pasar industri dan tradisional 
                  secara global.
                </p>
                <div className="bg-light p-6 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Spesifikasi Produk:</h4>
                  <ul className="space-y-2 text-dark/80">
                    <li><span className="font-semibold">Asal:</span> Sumatera, Indonesia</li>
                    <li><span className="font-semibold">Grade:</span> Whole & Split - 80/85, 90/95</li>
                    <li><span className="font-semibold">Kadar Air:</span> {'<'}5%</li>
                    <li><span className="font-semibold">Kemasan:</span> Sesuai Permintaan</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/betel-nut.jpg"
                  alt="Pinang Premium"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Vegetables */}
            <div>
              <h3 className="text-3xl font-display font-bold text-primary mb-6">
                Sayuran Segar
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-dark/80 mb-6">
                    Kami juga menyediakan sayuran segar, renyah, dan cerah yang dibudidayakan 
                    di tanah vulkanik subur Indonesia. Kami memastikan manajemen rantai pasokan 
                    yang cepat sehingga produk kami mencapai tujuan Anda dalam kondisi puncak 
                    kesegaran.
                  </p>
                  <div className="bg-light p-6 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Jenis Sayuran:</h4>
                    <ul className="grid grid-cols-2 gap-2 text-dark/80">
                      <li>• Kentang</li>
                      <li>• Ubi Jalar</li>
                      <li>• Kubis Hijau</li>
                      <li>• Kubis Putih</li>
                      <li>• Wortel</li>
                      <li>• Dan lainnya</li>
                    </ul>
                  </div>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/images/vegetables.jpg"
                    alt="Sayuran Segar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg text-secondary font-semibold mb-4">
            Sampel tersedia berdasarkan permintaan
          </p>
          <Button variant="primary" size="lg">
            Minta Sampel
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Products;