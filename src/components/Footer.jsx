'use client';
import { Poppins } from 'next/font/google';
import { MapPin, Phone, MessageCircle, Globe, Mail, Clock } from 'lucide-react';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Description */}
          <div>
            <div className={`${poppins.className} text-xl md:text-2xl font-bold tracking-tight mb-4`}>
              <span className="text-[#b91c1c]">AS MICRO</span>
              <span className="text-white"> & PATH LABS</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in health and diagnostics. Providing accurate, reliable, and timely pathology services since inception.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#packages" className="text-gray-400 hover:text-white transition-colors">Packages</a></li>
              <li><a href="#tests" className="text-gray-400 hover:text-white transition-colors">Tests</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>

            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div>
            <h4 className="text-xl font-bold mb-4">Working Hours</h4>
            <ul className="space-y-4 text-gray-400 mb-6">
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-[#2d9e8f] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white mb-1">Monday – Saturday</span>
                  <span>7:00 AM – 8:00 PM</span>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 mr-3 text-[#2d9e8f] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white mb-1">Sunday</span>
                  <span>8:00 AM – 2:00 PM</span>
                </div>
              </li>
            </ul>
            <a 
              href="#appointment"
              className="inline-flex bg-[#b91c1c] text-white px-5 py-2.5 rounded-md font-bold text-sm hover:bg-red-800 transition-colors shadow-sm"
            >
              Book Appointment →
            </a>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-[#b91c1c] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">75 Parwati Nagar, Pandit T.N. Mishra Marg, Nirman Nagar, Jaipur, Rajasthan</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#b91c1c] flex-shrink-0" />
                <a href="tel:+919602753579" className="hover:text-white transition-colors">+91 96027 53579</a>
              </li>
              <li className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-3 text-[#25d366] flex-shrink-0" />
                <a href="https://wa.me/919602753579" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 96027 53579 (WhatsApp No.)</a>
              </li>

              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#b91c1c] flex-shrink-0" />
                <a href="mailto:info@asmicropathlabs.com" className="hover:text-white transition-colors">info@asmicropathlabs.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Copyright Strip */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 AS MICRO & PATH LABS. All Rights Reserved. | Designed with ❤️ for better healthcare</p>
        </div>
      </div>
    </footer>
  );
}
