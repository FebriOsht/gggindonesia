import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Products from '@/components/home/Products';
import WhyUs from '@/components/home/WhyUs';
import BlogSection from '@/components/home/BlogSection';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Products />
      <WhyUs />
      <BlogSection />
      <Contact />
    </Layout>
  );
}