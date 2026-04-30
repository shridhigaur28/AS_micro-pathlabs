'use client';
import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function Packages() {
  const [isTableOpen, setIsTableOpen] = useState(false);

  const packages = [
    {
      name: 'SILVER PACKAGE',
      accent: '#94a3b8',
      bgTint: 'bg-white',
      badge: null,
      mrp: '1,199',
      price: '949',
      save: '250',
      total: 27,
      tests: [
        'Fasting Blood Sugar',
        'Lipid Profile (5 Tests)',
        'Thyroid Profile (3 Tests)',
        'Kidney Function (10 Tests)',
        'Liver Function (8 Tests)',
      ]
    },
    {
      name: 'GOLD PACKAGE',
      accent: '#d97706',
      bgTint: 'bg-amber-50/10',
      badge: '⭐ Most Popular',
      mrp: '1,599',
      price: '1,249',
      save: '350',
      total: 48,
      tests: [
        'Fasting Blood Sugar',
        'Lipid Profile (5 Tests)',
        'Thyroid Profile (3 Tests)',
        'Kidney Function (10 Tests)',
        'Liver Function (8 Tests)',
        'Complete Blood Count (19 Tests)',
        'HbA1c (1 Test)',
      ]
    },
    {
      name: 'PLATINUM PACKAGE',
      accent: '#2d9e8f',
      bgTint: 'bg-white',
      badge: null,
      mrp: '2,499',
      price: '1,949',
      save: '550',
      total: 34,
      tests: [
        'Fasting Blood Sugar',
        'Lipid Profile (5 Tests)',
        'Thyroid Profile (3 Tests)',
        'Kidney Function (10 Tests)',
        'Liver Function (8 Tests)',
        'Vitamin B12 (1 Test)',
        'Vitamin D 25-Hydroxy (1 Test)',
      ]
    },
    {
      name: 'DIAMOND PACKAGE',
      accent: '#b91c1c',
      bgTint: 'bg-red-50/10',
      badge: '💎 Best Value',
      mrp: '2,899',
      price: '2,249',
      save: '650',
      total: 55,
      tests: [
        'Fasting Blood Sugar',
        'Lipid Profile (5 Tests)',
        'Thyroid Profile (3 Tests)',
        'Kidney Function (10 Tests)',
        'Liver Function (8 Tests)',
        'Complete Blood Count (19 Tests)',
        'HbA1c (1 Test)',
        'Vitamin B12 (1 Test)',
        'Vitamin D 25-Hydroxy (1 Test)',
      ]
    }
  ];

  const tableData = [
    { name: 'Fasting Blood Sugar', silver: true, gold: true, platinum: true, diamond: true },
    { name: 'Lipid Profile (5 Tests)', silver: true, gold: true, platinum: true, diamond: true },
    { name: 'Thyroid Profile (3 Tests)', silver: true, gold: true, platinum: true, diamond: true },
    { name: 'Kidney Function (10 Tests)', silver: true, gold: true, platinum: true, diamond: true },
    { name: 'Liver Function (8 Tests)', silver: true, gold: true, platinum: true, diamond: true },
    { name: 'Complete Blood Count (19 Tests)', silver: false, gold: true, platinum: false, diamond: true },
    { name: 'HbA1c (1 Test)', silver: false, gold: true, platinum: false, diamond: true },
    { name: 'Vitamin B12 (1 Test)', silver: false, gold: false, platinum: true, diamond: true },
    { name: 'Vitamin D 25-Hydroxy (1 Test)', silver: false, gold: false, platinum: true, diamond: true },
  ];

  const handleBookPackage = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('preselectTest', { detail: 'Health Check-up Package' }));
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <section id="packages" className={`py-20 bg-[#f0fafa] ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#b91c1c] font-semibold tracking-wider uppercase text-sm">Our Packages</span>
          <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Affordable Health Check-up Packages
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the right package for you and your family. All packages include home sample collection.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${pkg.bgTint}`}
              style={{ borderTopWidth: '4px', borderTopColor: pkg.accent }}
            >
              {pkg.badge && (
                <div 
                  className="absolute top-0 right-0 text-xs font-bold text-white px-3 py-1 rounded-bl-lg"
                  style={{ backgroundColor: pkg.accent }}
                >
                  {pkg.badge}
                </div>
              )}
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 pt-2" style={{ color: pkg.accent }}>{pkg.name}</h3>
                
                {/* Price Block */}
                <div className="mb-4">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-sm text-gray-400 line-through font-medium">₹{pkg.mrp}</span>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Save ₹{pkg.save}</span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold" style={{ color: pkg.accent }}>₹{pkg.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Special Price</p>
                </div>

                <p className="text-gray-600 font-medium mb-6 pb-4 border-b border-gray-200">
                  {pkg.total} Tests Included
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.tests.map((test, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: pkg.accent }} />
                      <span className="text-sm text-gray-700">{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <button 
                  onClick={handleBookPackage}
                  className="w-full py-3 rounded-md text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: pkg.accent }}
                >
                  Book This Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Comparison Table */}
        <div className="text-center mb-8">
          <button 
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="inline-flex items-center text-[#1a1a2e] font-semibold hover:text-[#b91c1c] transition-colors"
          >
            {isTableOpen ? 'Hide Full Package Comparison' : 'View Full Package Comparison'}
            {isTableOpen ? <ChevronUp className="ml-2 w-5 h-5" /> : <ChevronDown className="ml-2 w-5 h-5" />}
          </button>
        </div>

        {/* Comparison Table */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isTableOpen ? 'max-h-[1000px] opacity-100 mb-16' : 'max-h-0 opacity-0'}`}>
          <h3 className="text-2xl font-bold text-center text-[#1a1a2e] mb-6">Detailed Package Comparison</h3>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#1a1a2e] text-white">
                  <th className="p-4 font-semibold text-sm">TEST NAME</th>
                  <th className="p-4 font-semibold text-sm text-center">SILVER</th>
                  <th className="p-4 font-semibold text-sm text-center">GOLD</th>
                  <th className="p-4 font-semibold text-sm text-center">PLATINUM</th>
                  <th className="p-4 font-semibold text-sm text-center">DIAMOND</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tableData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                    <td className="p-4 border-b border-gray-100 text-sm font-medium text-gray-800">{row.name}</td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {row.silver ? <span className="text-[#16a34a] font-bold text-xl">✓</span> : <span className="text-[#9ca3af] font-bold text-xl">—</span>}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {row.gold ? <span className="text-[#16a34a] font-bold text-xl">✓</span> : <span className="text-[#9ca3af] font-bold text-xl">—</span>}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {row.platinum ? <span className="text-[#16a34a] font-bold text-xl">✓</span> : <span className="text-[#9ca3af] font-bold text-xl">—</span>}
                    </td>
                    <td className="p-4 border-b border-gray-100 text-center">
                      {row.diamond ? <span className="text-[#16a34a] font-bold text-xl">✓</span> : <span className="text-[#9ca3af] font-bold text-xl">—</span>}
                    </td>
                  </tr>
                ))}
                {/* Price Row */}
                <tr className="bg-[#2d9e8f] text-white font-bold">
                  <td className="p-4 border-b border-teal-600 text-sm">Special Price</td>
                  <td className="p-4 border-b border-teal-600 text-center text-lg">₹949</td>
                  <td className="p-4 border-b border-teal-600 text-center text-lg">₹1,249</td>
                  <td className="p-4 border-b border-teal-600 text-center text-lg">₹1,949</td>
                  <td className="p-4 border-b border-teal-600 text-center text-lg">₹2,249</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



      </div>
    </section>
  );
}
