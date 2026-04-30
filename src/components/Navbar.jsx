'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Packages', href: '#packages' },
    { name: 'Tests', href: '#tests' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToSection = (e, href, name) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveLink(name);
    
    if (href === '#hero' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] py-3' : 'bg-white py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LEFT: Logo + Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={(e) => handleScrollToSection(e, '#hero', 'Home')}>
              <Image 
                src="/logo.png" 
                alt="AS Micro & Path Labs Logo" 
                width={40} 
                height={40} 
                className="mr-3"
              />
              <div className={`${poppins.className} text-xl md:text-2xl font-bold tracking-tight`}>
                <span className="text-[#b91c1c]">AS MICRO</span>
                <span className="text-[#1a1a2e]"> & PATH LABS</span>
              </div>
            </Link>
          </div>
          
          {/* CENTER: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href, link.name)}
                className={`text-[15px] font-medium transition-colors duration-200 ${activeLink === link.name ? 'text-[#b91c1c] underline underline-offset-[6px] decoration-2 decoration-[#b91c1c]' : 'text-[#1a1a2e] hover:text-[#b91c1c]'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT: CTA Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleBookAppointment}
              className="bg-[#b91c1c] text-white px-[20px] py-[10px] rounded-[6px] font-semibold hover:bg-[#991b1b] hover:scale-[1.03] transition-all duration-200 ease-in-out"
            >
              Book Appointment
            </button>
          </div>

          {/* MOBILE: Hamburger */}
          <div className="md:flex lg:hidden hidden md:hidden"> {/* Keep hidden on desktop */}
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#1a1a2e] hover:text-[#b91c1c] focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[400px] border-t border-gray-100' : 'max-h-0'}`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleScrollToSection(e, link.href, link.name)}
              className={`block px-3 py-3 text-[15px] font-medium rounded-md transition-colors ${activeLink === link.name ? 'text-[#b91c1c] bg-red-50' : 'text-[#1a1a2e] hover:text-[#b91c1c] hover:bg-gray-50'}`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 pb-1">
            <button 
              onClick={handleBookAppointment}
              className="w-full bg-[#b91c1c] text-white px-[20px] py-[12px] rounded-[6px] font-semibold hover:bg-[#991b1b] transition-colors duration-200 ease-in-out"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
