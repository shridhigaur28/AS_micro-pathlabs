'use client';
import { Poppins } from 'next/font/google';
import { CheckCircle2, MapPin, Phone, MessageCircle, Globe, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogs } from '@/lib/blogs';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});



export default function About() {
  return (
    <section id="about" className={`bg-[#f8fafc] ${poppins.className}`}>
      
      {/* Sub-section 1: About Us */}
      <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl w-full h-[400px] md:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=450&fit=crop"
                alt="Lab technician at AS Micro Path Labs"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Optional decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#2d9e8f] rounded-2xl opacity-20 -z-10"></div>
          </div>

          {/* Right: Text */}
          <div>
            <span className="text-[#b91c1c] font-bold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl leading-tight">
              AS MICRO & PATH LABS Exists to Put Your Health First
            </h2>
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                At AS Micro & Path Labs, we are committed to delivering accurate, reliable, and timely diagnostic services to support better healthcare decisions. Our focus is on patient safety, quality testing, and transparent reporting using modern laboratory technology.
              </p>
              <p>
                We understand that every test result matters. That's why our experienced pathologists and trained technicians follow strict quality protocols to ensure precision and consistency in every report we deliver.
              </p>
              <p>
                From routine blood tests to specialized diagnostics, we aim to provide a comfortable, hygienic, and trustworthy testing experience for patients of all age groups.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                "Advanced and fully automated diagnostic equipment",
                "Experienced & qualified pathologists",
                "Accurate, reliable & timely test reports",
                "Strict quality control & hygiene standards",
                "Patient-friendly sample collection process"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#2d9e8f] mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="border-t border-gray-200"></div></div>

      {/* Sub-section 2: Blogs */}
      <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#2d9e8f] font-bold tracking-wider uppercase text-sm">Health Insights</span>
          <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Latest from Our Blog
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed with expert health tips and diagnostic insights from our pathologists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col overflow-hidden group">
              <div className="w-full h-48 overflow-hidden rounded-t-xl">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${blog.categoryBg} ${blog.categoryText}`}>
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>{blog.author}</span>
                  <span>·</span>
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                </div>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-[#b91c1c] font-semibold hover:underline inline-flex items-center gap-1 text-sm transition-all duration-200 mt-4"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="border-t border-gray-200"></div></div>

      {/* Sub-section 3: Address & Map */}
      <div id="contact" className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info */}
          <div>
            <span className="text-[#b91c1c] font-bold tracking-wider uppercase text-sm">Find Us</span>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl mb-8">
              Visit Us or Get in Touch
            </h2>

            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="w-6 h-6 text-[#2d9e8f] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-lg mb-1">Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    75 Parwati Nagar, Pandit T.N. Mishra Marg,<br />
                    Nirman Nagar, Jaipur, Rajasthan
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Phone className="w-6 h-6 text-[#2d9e8f] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-lg mb-1">Phone</h4>
                  <a href="tel:+919602753579" className="text-gray-600 hover:text-[#b91c1c] transition-colors">
                    +91 96027 53579
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <MessageCircle className="w-6 h-6 text-[#2d9e8f] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-lg mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919602753579" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#25d366] transition-colors">
                    +91 96027 53579
                  </a>
                </div>
              </li>



              <li className="flex items-start">
                <Clock className="w-6 h-6 text-[#2d9e8f] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1a1a2e] text-lg mb-1">Working Hours</h4>
                  <p className="text-gray-600">
                    Monday – Saturday: 7:00 AM – 8:00 PM<br />
                    Sunday: 8:00 AM – 2:00 PM
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+919602753579"
                className="bg-[#b91c1c] text-white font-bold px-8 py-3 rounded-md hover:bg-red-800 transition-colors text-center shadow-md flex items-center justify-center"
              >
                📞 Call Now
              </a>
              <a 
                href="https://wa.me/919602753579"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] text-white font-bold px-8 py-3 rounded-md hover:bg-green-600 transition-colors text-center shadow-md flex items-center justify-center"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <div className="h-full min-h-[300px] lg:min-h-[400px]">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white p-2">
              <iframe
                src="https://www.google.com/maps?q=75+Parwati+Nagar,+Pandit+T.N.+Mishra+Marg,+Nirman+Nagar,+Jaipur,+Rajasthan&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl h-[300px] lg:h-full"
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
