import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-950 text-white overflow-hidden">
      {/* Background Image (Menggunakan file lokal dari public/img) */}
      <div 
        className="absolute inset-0 bg-[url('/img/hero.png')] bg-cover bg-center opacity-30"
      ></div>
      
      {/* Subtle Gradient Overlay (Efek gelap tambahan agar teks lebih menonjol) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-950/90"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-4 md:px-8 mt-16">
        <span className="text-emerald-400 font-semibold tracking-widest uppercase text-sm md:text-base mb-4 block drop-shadow-md">
          PT.Gatha Gemilang Global
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-xl">
          Connecting Global Markets with <br className="hidden md:block" /> 
          <span className="text-emerald-500">Finest Indonesian Products</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-md">
          Your dependable, open, and effective sourcing partner. We bring the authentic, high-quality commodities from the Indonesian archipelago to the world.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="#products" 
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-emerald-600/30"
          >
            Explore Our Products
          </Link>
          <Link 
            href="#contact" 
            className="px-8 py-4 bg-black/20 backdrop-blur-sm border border-white/50 hover:bg-white hover:text-gray-900 text-white font-medium rounded-lg transition-all duration-300 w-full sm:w-auto shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}