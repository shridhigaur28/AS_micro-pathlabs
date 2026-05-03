'use client';
import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Poppins } from 'next/font/google';
import categories from './testsData';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Tests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  const transition = (callback) => {
    setIsVisible(false);
    setTimeout(() => {
      callback();
      setSearchTerm('');
      setIsVisible(true);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleSelectCategory = (cat) => transition(() => setSelectedCategory(cat));
  const handleBack = () => transition(() => setSelectedCategory(null));

  const handleBookTest = (e, test) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('preselectTest', { detail: test.name }));
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTests = selectedCategory
    ? selectedCategory.tests.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const cardHover = {
    onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'; },
    onMouseLeave: (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; },
  };

  return (
    <section id="tests" ref={sectionRef} className={`py-20 bg-white ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#2d9e8f] font-semibold tracking-wider uppercase text-sm">
            {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.name} Tests` : 'Browse by Health Condition'}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            {selectedCategory ? `${selectedCategory.emoji} ${selectedCategory.name} Tests` : 'Browse & Book Individual Tests'}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {selectedCategory
              ? `Showing ${selectedCategory.tests.length} tests for ${selectedCategory.name} conditions`
              : 'Select a health condition to explore relevant diagnostic tests at affordable prices.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2d9e8f] focus:border-[#2d9e8f] sm:text-sm shadow-sm transition-colors"
            placeholder={selectedCategory ? "Search tests... e.g. Blood Sugar" : "Search conditions... e.g. Heart"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content with fade */}
        <div className="mb-16" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 200ms ease-in-out' }}>

          {/* LEVEL 1 — Category Cards */}
          {!selectedCategory && (
            <>
              {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col"
                      style={{ borderTopWidth: '4px', borderTopColor: '#2d9e8f', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer' }}
                      {...cardHover}
                    >
                      <div className="relative w-full h-52 overflow-hidden rounded-t-xl bg-gray-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{ objectPosition: cat.imagePosition }}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white font-bold text-lg drop-shadow-lg">
                          {cat.emoji} {cat.name}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{cat.description}</p>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-gray-400 font-semibold">{cat.tests.length} Tests Available</span>
                            <span className="text-sm font-bold text-[#2d9e8f]">from {cat.priceRange.split('–')[0].trim()}</span>
                          </div>
                          <button
                            onClick={() => handleSelectCategory(cat)}
                            className="w-full py-3 px-4 rounded-md font-bold text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#1a1a2e' }}
                          >
                            Explore Tests →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-lg text-gray-600 font-medium">
                    No results found. Call <a href="tel:+919602753579" className="text-[#b91c1c] font-bold hover:underline">+91 96027 53579</a> for help.
                  </p>
                </div>
              )}
            </>
          )}

          {/* LEVEL 2 — Individual Tests */}
          {selectedCategory && (
            <>
              <div className="mb-6">
                <button onClick={handleBack} className="text-sm font-semibold hover:underline" style={{ color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  ← Back to All Categories
                </button>
              </div>
              {filteredTests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTests.map((test, i) => (
                    <div
                      key={`${selectedCategory.id}-${i}`}
                      className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden"
                      style={{ borderTopWidth: '4px', borderTopColor: '#2d9e8f', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                      {...cardHover}
                    >
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="text-4xl mb-4">{test.icon}</div>
                        <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{test.name}</h3>
                        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">{test.description}</p>
                        <div className="mt-auto">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Starting at</p>
                          <p className="text-3xl font-extrabold text-[#b91c1c] mb-6">₹{test.price}</p>
                          <button
                            onClick={(e) => handleBookTest(e, test)}
                            className="w-full py-3 px-4 rounded-md font-bold text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: '#2d9e8f' }}
                          >
                            Book This Test
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-lg text-gray-600 font-medium">
                    No results found. Call <a href="tel:+919602753579" className="text-[#b91c1c] font-bold hover:underline">+91 96027 53579</a> for help.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom CTA Strip */}
        <div className="bg-[#b91c1c] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <p className="text-white text-lg font-bold md:max-w-2xl mb-6 md:mb-0 text-center md:text-left leading-relaxed">
            Don't see your test? We offer 500+ tests.<br />
            Call or WhatsApp us and we'll help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:+919602753579" className="bg-white text-[#b91c1c] font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm">
              📞 Call Now
            </a>
            <a href="https://wa.me/919602753579" target="_blank" rel="noopener noreferrer" className="bg-white text-[#b91c1c] font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm">
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
