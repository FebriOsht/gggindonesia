import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Truck,
  Search,
  Star
} from 'lucide-react';

const WhyUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Kualitas Terjamin',
      description: 'Kami secara pribadi memeriksa peternakan dan pabrik, memastikan kualitas konsisten dan praktik etis.'
    },
    {
      icon: Globe,
      title: 'Jangkauan Global',
      description: 'Menghubungkan pasar global dengan produk-produk terbaik dari seluruh kepulauan Indonesia.'
    },
    {
      icon: TrendingUp,
      title: 'Pengalaman Industri',
      description: 'Didukung oleh para pemangku kepentingan dengan pengalaman bertahun-tahun di Industri Bisnis dan Perbankan.'
    },
    {
      icon: Users,
      title: 'Tim Profesional',
      description: 'Tim ahli yang berdedikasi untuk memberikan layanan terbaik dan solusi sourcing yang efektif.'
    },
    {
      icon: Truck,
      title: 'Manajemen Rantai Pasok',
      description: 'Kami mengelola seluruh rantai pasokan, dari desa terpencil hingga pelabuhan tujuan Anda.'
    },
    {
      icon: Search,
      title: 'Inspeksi Ketat',
      description: 'Memastikan semua produk memenuhi standar internasional sebelum dikirim ke klien.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Container>
        <div className="text-center mb-16">
          <h2 className="section-title">Mengapa Memilih GGG?</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Kami menghilangkan kerumitan sourcing internasional dengan kehadiran lokal dan profesionalisme mutlak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 hover:transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{benefit.title}</h3>
              <p className="text-dark/70">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
              <div className="text-dark/60">Kualitas Terjamin</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">24/7</div>
              <div className="text-dark/60">Layanan Pelanggan</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">10+</div>
              <div className="text-dark/60">Negara Tujuan</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyUs;