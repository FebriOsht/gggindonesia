'use client';

import React, { useState, useEffect } from 'react';
import { Coffee, Droplet, Palmtree, Leaf, CheckCircle2 } from 'lucide-react';

// --- PENGGANTI SEMENTARA UNTUK PREVIEW ---
// Di project Next.js Anda yang sebenarnya, HAPUS BLOK INI dan gunakan:
// import Link from 'next/link';
const Link = ({ href, children, className, onClick }: any) => (
  <a href={href} className={className} onClick={onClick}>{children}</a>
);
// -----------------------------------------

const ProductsContent = () => {
  const [activeTab, setActiveTab] = useState('coffee');

  useEffect(() => {
    // Fungsi utama untuk mengatur Tab dan Scroll
    const handleNav = (targetHash: string) => {
      if (typeof window === 'undefined') return;
      const hash = targetHash.replace('#', '');
      
      const hashToTabMap: Record<string, string> = {
        'arabica': 'coffee',
        'robusta': 'coffee',
        'molasses': 'sweeteners',
        'palm-sugar': 'sweeteners',
        'coconut': 'coconut',
        'betel-nut': 'others',
        'vegetables': 'others'
      };

      if (hashToTabMap[hash]) {
        // 1. Ganti Tab-nya terlebih dahulu
        setActiveTab(hashToTabMap[hash]);
        
        // 2. Jeda sebentar lalu Gulir (Scroll) ke posisi elemen
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const yOffset = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Saat halaman pertama kali dimuat
    if (window.location.hash) {
      handleNav(window.location.hash);
    }

    // Mendengarkan perubahan hash (misal via tombol Back di browser)
    const onHashChange = () => handleNav(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    // Mencegat semua klik Link (Solusi agar SELALU gulir ke atas walau hash-nya sama)
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target || !target.href) return;
      
      try {
        const url = new URL(target.href);
        // Memastikan ini adalah klik link ke halaman yang sama dan memiliki #hash
        if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) {
          const hash = url.hash.replace('#', '');
          const validHashes = ['arabica', 'robusta', 'molasses', 'palm-sugar', 'coconut', 'betel-nut', 'vegetables'];
          
          if (validHashes.includes(hash)) {
            e.preventDefault(); // Menghentikan perilaku default Next.js yang suka diam
            window.history.pushState(null, '', url.hash); // Update URL di browser
            handleNav(url.hash); // Paksa jalankan fungsi penarik layar
          }
        }
      } catch (err) {
        // Abaikan URL yang tidak valid
      }
    };

    // Daftarkan event listener
    window.addEventListener('click', onClick, { capture: true });

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('click', onClick, { capture: true });
    };
  }, []);

  const tabs = [
    { id: 'premiumcoffee', name: 'Premium Coffee', icon: Coffee },
    { id: '#naturalsweeteners', name: 'Natural Sweeteners', icon: Droplet },
    { id: 'coconut', name: 'Coconut Products', icon: Palmtree },
    { id: 'others', name: 'Betel Nut & Vegetables', icon: Leaf },
  ];

  const coffeeProducts = {
    arabica: {
      title: 'Indonesian Arabica',
      description: 'Prized for its complex and nuanced flavors, Indonesian Arabica is predominantly grown in the high-altitude regions of Sumatra, Java, Sulawesi, and Bali. These coffees are celebrated for their full body, low acidity, and distinctive tasting notes, which often include earthy, spicy, and chocolatey profiles, with some regions offering brighter fruity and floral characteristics. As the star of the Indonesian specialty coffee scene, it is typically enjoyed as a single-origin brew, allowing its unique terroir to shine.',
      origins: [
        { region: 'Gayo', notes: 'Earthy, Chocolate, Citric Notes, Nutty, Herbal, Spicy', body: 'Strong, Robust Body, Medium Acidity' },
        { region: 'Mandheling', notes: 'Earthy, Spicy, Cocoa, Chocolate, Licorice, Sweet Finish', body: 'Full, Syrupy Body, Low Acidity' },
        { region: 'Java', notes: 'Rich, Chocolate, Earthy, Molasses, Clove, Fig, Cedar, Cinnamon', body: 'Heavy Body, Low Acidity' },
        { region: 'Lintong', notes: 'Earthy Cedar, Dark Chocolate, Sweet Tobacco, Herbaceous Spices', body: 'Heavy Body, Low Acidity' }
      ],
      grades: 'Grade 1 (Specialty), Grade 2, Grade 3',
      processing: 'Full / Semi-Washed',
      image: '/img/Arabica.jpeg' 
    },
    robusta: {
      title: 'Indonesian Robusta',
      description: 'Known for its strength and bold character, thriving in lower-altitude regions like Lampung and Java. Ideal for espresso blends, delivering intense flavors and an excellent crema.',
      origins: [
        { region: 'Lampung', notes: 'Strong, Earthy, More Bitter, Intense', body: 'Full Body, Low Acidity' },
        { region: 'Sidikalang', notes: 'Earthy, Spicy, Hot, Fresh', body: 'Full Body' },
        { region: 'Temanggung', notes: 'Earthy, Caramel, Woody', body: 'Full Body, Low Acidity' }
      ],
      grades: 'Grade 3',
      processing: 'Full / Semi-Washed',
      image: '/img/Robusta.jpeg' 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">
          Our Catalog
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Our Premium Products
        </h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                // Menghapus hash dari URL ketika tab diklik manual agar lebih rapi
                if (window.history.pushState) {
                  window.history.pushState('', '/', window.location.pathname);
                }
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md transform scale-105'
                  : 'bg-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="min-h-[600px]"> {/* Wrapper to reduce scroll jumping */}
        
        {/* --- COFFEE TAB --- */}
        {activeTab === 'coffee' && (
          <div className="space-y-24 animate-fade-in">
            {/* Arabica */}
            <div id="arabica">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                    {coffeeProducts.arabica.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {coffeeProducts.arabica.description}
                  </p>
                  
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
                    <h4 className="font-bold text-emerald-900 mb-4 text-lg">Product Specifications</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Grade:</strong> {coffeeProducts.arabica.grades}</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Processing:</strong> {coffeeProducts.arabica.processing}</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Payment Terms:</strong> T/T or Irrevocable LC At Sight</span></li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <img src={coffeeProducts.arabica.image} alt="Indonesian Arabica" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-6">Regional Variants</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coffeeProducts.arabica.origins.map((origin, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h5 className="text-xl font-bold text-emerald-700 mb-3">{origin.region}</h5>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      <strong className="text-gray-900 block mb-1">Tasting Notes:</strong> {origin.notes}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 block mb-1">Body & Acidity:</strong> {origin.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Robusta */}
            <div id="robusta">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10 items-center">
                <div className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <img src={coffeeProducts.robusta.image} alt="Indonesian Robusta" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                    {coffeeProducts.robusta.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {coffeeProducts.robusta.description}
                  </p>
                  
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl mb-8">
                    <h4 className="font-bold text-emerald-900 mb-4 text-lg">Product Specifications</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Grade:</strong> {coffeeProducts.robusta.grades}</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Processing:</strong> {coffeeProducts.robusta.processing}</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0"/> <span className="text-gray-700"><strong className="text-gray-900">Payment Terms:</strong> T/T or Irrevocable LC At Sight</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-6">Regional Variants</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coffeeProducts.robusta.origins.map((origin, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <h5 className="text-xl font-bold text-emerald-700 mb-3">{origin.region}</h5>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      <strong className="text-gray-900 block mb-1">Tasting Notes:</strong> {origin.notes}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong className="text-gray-900 block mb-1">Body & Acidity:</strong> {origin.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- SWEETENERS TAB --- */}
        {activeTab === 'sweeteners' && (
          <div className="space-y-24 animate-fade-in" id="sweeteners-section">
            {/* Molasses */}
            <div id="molasses" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Pure Sugarcane Molasses
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Pure sugarcane molasses is a thick, dark, nutrient-rich syrup produced by boiling sugarcane juice and removing sugar crystals. It is 100% natural, containing high amounts of calcium, iron, potassium, magnesium, and manganese. Common uses include organic farming/fertilizer, livestock feed, and as a sweetener.
                </p>
                <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-6 text-lg">Technical Specifications</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Form:</strong> Liquid</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Brix:</strong> 80.6%</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Total Sugar Invert:</strong> 55%</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Density:</strong> 1.4 kg/Ltr</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Origin:</strong> Indonesia</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2"/> <strong className="text-gray-900 mr-2">Production Capacity:</strong> 10.000 MT / Year</li>
                    <li className="flex items-start sm:col-span-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0"/> <strong className="text-gray-900 mr-2">Packaging:</strong> Drum, IBC, FLexibag</li>
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <img src="/img/Molasses.png" alt="Pure Sugarcane Molasses" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Palm Sugar */}
            <div id="palm-sugar" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <img src="/img/Palm Sugar.jpeg" alt="Premium Palm Sugar" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Premium Palm Sugar
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Premium palm sugar is a mineral-rich natural sweetener derived from the sap of the palm tree, primarily produced in Southeast Asia, particularly Indonesia. It is a healthier alternative to cane sugar with a lower glycemic index, a caramel flavor, and is used in liquid, granulated, or block forms.
                </p>
                <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-6 text-lg">Technical Specifications</h4>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"/> <span><strong className="text-gray-900">Raw Material:</strong> Nectar of palm</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"/> <span><strong className="text-gray-900">Taste:</strong> Sweet Soft Caramel Taste</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"/> <span><strong className="text-gray-900">Color:</strong> Golden Brown</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"/> <span><strong className="text-gray-900">Form:</strong> Moulded, powder (as requested)</span></li>
                    <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"/> <span><strong className="text-gray-900">Packaging:</strong> As requested</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- COCONUT TAB --- */}
        {activeTab === 'coconut' && (
          <div id="coconut" className="animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
              <div className="p-10 lg:p-16 flex flex-col justify-center lg:w-1/2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                  <Palmtree className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Premium Coconut Products
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Harvested from the lush, tropical coasts of Indonesia, our coconut products are processed with strict hygiene standards to retain their natural freshness, oils, and nutritional value.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center">
                    <span className="w-1/3 font-bold text-gray-900">Form</span>
                    <span className="w-2/3 text-gray-600">COPRA, Whole coconut</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center">
                    <span className="w-1/3 font-bold text-gray-900">Size</span>
                    <span className="w-2/3 text-gray-600">As Requested</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl flex items-center">
                    <span className="w-1/3 font-bold text-gray-900">Packaging</span>
                    <span className="w-2/3 text-gray-600">As Requested</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto lg:w-1/2">
                <img src="/img/Coconut.jpeg" alt="Premium Coconut Products" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* --- OTHERS TAB (BETEL NUT & VEGETABLES) --- */}
        {activeTab === 'others' && (
          <div className="space-y-24 animate-fade-in">
            {/* Betel Nut */}
            <div id="betel-nut" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Betel Nut
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We export premium quality, sun-dried Betel Nuts. Carefully selected and processed, our betel nuts feature excellent internal patterns and moisture content, catering to diverse industrial and traditional market demands globally.
                </p>
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl">
                  <h4 className="font-bold text-emerald-900 mb-4 text-lg">Product Specifications:</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between border-b border-emerald-200/50 pb-2">
                      <strong className="text-gray-900">Origin:</strong> <span>Sumatera, Indonesia</span>
                    </li>
                    <li className="flex justify-between border-b border-emerald-200/50 pb-2">
                      <strong className="text-gray-900">Grade:</strong> <span>Whole & Split - 80/85, 90/95</span>
                    </li>
                    <li className="flex justify-between border-b border-emerald-200/50 pb-2">
                      <strong className="text-gray-900">Moisture Content:</strong> <span>{'<'} 5%</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <strong className="text-gray-900">Packaging:</strong> <span>As Requested</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <img src="/img/Betel Nut.jpeg" alt="Betel Nut" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Vegetables */}
            <div id="vegetables" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                <img src="/img/Vegetables.png" alt="Fresh Vegetables" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
                  Fresh Vegetables
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We also supply farm-fresh, crisp, and vibrant vegetables cultivated in Indonesia's fertile volcanic soils. We ensure rapid supply chain management so our produce reaches your destination at peak freshness.
                </p>
                <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-6 text-lg">Main Commodities:</h4>
                  <ul className="grid grid-cols-2 gap-4 text-gray-600">
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> Potatoes</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> Sweet Potatoes</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> Green Cabbages</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> White Cabbages</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> Carrots</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span> And More...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="text-center mt-24 pt-16 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Interested in our products?
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Samples are available upon request to guarantee our quality.
        </p>
        <Link 
          href="#contact" 
          className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Request a Sample
        </Link>
      </div>
    </div>
  );
};

export default function Products() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <ProductsContent />
    </section>
  );
}