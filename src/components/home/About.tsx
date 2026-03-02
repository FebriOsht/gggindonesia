import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Users, TrendingUp, Shield, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '2025', label: 'Tahun Berdiri' },
    { icon: TrendingUp, value: '10.000+', label: 'MT Produk/Tahun' },
    { icon: Shield, value: '100%', label: 'Kualitas Terjamin' },
    { icon: Clock, value: '24/7', label: 'Layanan Pelanggan' },
  ];

  return (
    <section id="about" className="py-20 bg-light">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Tentang Kami</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Berbasis di Medan, Sumatera Utara, Indonesia, Gatha Gemilang Global adalah 
            perusahaan ekspor terkemuka yang didirikan pada tahun 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-display font-bold text-primary mb-6">
              Mitra Terpercaya untuk Produk Indonesia Berkualitas
            </h3>
            <p className="text-lg text-dark/80 mb-6 leading-relaxed">
              Didukung oleh para pemangku kepentingan dengan pengalaman bertahun-tahun 
              di Industri Bisnis dan Perbankan, kami fokus menghubungkan pasar global 
              dengan produk-produk terbaik dari seluruh kepulauan Indonesia.
            </p>
            <p className="text-lg text-dark/80 mb-6 leading-relaxed">
              Keahlian kami terletak pada sumber daya autentik, komoditas berkualitas 
              tinggi dan memastikan mereka secara ketat memenuhi standar internasional 
              untuk klien kami di seluruh dunia.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <h4 className="font-display font-bold text-primary text-xl mb-2">Visi</h4>
              <p className="text-dark/70">
                Menjadi merek pertama yang dipikirkan pembeli saat mencari komoditas Indonesia yang andal dan berkualitas tinggi.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <h4 className="font-display font-bold text-primary text-xl mb-2">Misi</h4>
              <p className="text-dark/70">
                Memfasilitasi ekspor produk Indonesia berkualitas tinggi dengan menawarkan mitra sourcing yang andal, terbuka, dan efektif.
              </p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:transform hover:-translate-y-2">
              <stat.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
              <div className="text-3xl font-display font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-dark/60">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default About;