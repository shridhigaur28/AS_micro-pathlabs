import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Packages from '@/components/Packages';
import Tests from '@/components/Tests';
import AppointmentForm from '@/components/AppointmentForm';
import About from '@/components/About';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Packages />
      <Tests />
      <AppointmentForm />
      <About />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
