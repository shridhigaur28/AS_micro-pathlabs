'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const testsData = [
  {
    id: 1,
    name: "Fasting Blood Sugar",
    description: "Measures blood glucose levels to screen for diabetes and prediabetes.",
    price: 99,
    icon: "🩸",
    dropdownValue: "Blood Test"
  },
  {
    id: 2,
    name: "Lipid Profile (5 Tests)",
    description: "Comprehensive cholesterol panel including HDL, LDL, VLDL, and triglycerides.",
    price: 299,
    icon: "🫀",
    dropdownValue: "Blood Test"
  },
  {
    id: 3,
    name: "Thyroid Profile (3 Tests)",
    description: "Measures T3, T4, and TSH to evaluate thyroid gland function.",
    price: 349,
    icon: "🔬",
    dropdownValue: "Blood Test"
  },
  {
    id: 4,
    name: "Kidney Function (10 Tests)",
    description: "Complete kidney function panel to assess renal health and detect disorders early.",
    price: 499,
    icon: "🧬",
    dropdownValue: "Blood Test"
  },
  {
    id: 5,
    name: "Liver Function (8 Tests)",
    description: "Evaluates liver enzymes and proteins to detect liver disease or damage.",
    price: 449,
    icon: "🧪",
    dropdownValue: "Biochemistry Test"
  },
  {
    id: 6,
    name: "Complete Blood Count (19 Tests)",
    description: "Full blood count test covering RBC, WBC, platelets, haemoglobin and more.",
    price: 249,
    icon: "💉",
    dropdownValue: "Blood Test"
  },
  {
    id: 7,
    name: "HbA1c (1 Test)",
    description: "Measures average blood sugar over 3 months — key test for diabetes management.",
    price: 299,
    icon: "📊",
    dropdownValue: "Blood Test"
  },
  {
    id: 8,
    name: "Vitamin B12 (1 Test)",
    description: "Detects Vitamin B12 deficiency which affects energy, nerves and red blood cells.",
    price: 349,
    icon: "💊",
    dropdownValue: "Blood Test"
  },
  {
    id: 9,
    name: "Vitamin D 25-Hydroxy (1 Test)",
    description: "Measures Vitamin D levels to assess bone health, immunity and deficiency risk.",
    price: 499,
    icon: "☀️",
    dropdownValue: "Blood Test"
  }
];

export default function Tests() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTests = testsData.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookTest = (e, testName) => {
    e.preventDefault();
    const test = testsData.find(t => t.name === testName);
    window.dispatchEvent(new CustomEvent('preselectTest', { detail: test.dropdownValue }));

    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tests" className={`py-20 bg-white ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#2d9e8f] font-semibold tracking-wider uppercase text-sm">Individual Tests</span>
          <h2 className="mt-3 text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
            Browse & Book Individual Tests
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No package? No problem. Book any individual test at the most affordable prices with home sample collection.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#2d9e8f] focus:border-[#2d9e8f] sm:text-sm shadow-sm transition-colors"
            placeholder="Search for a test... e.g. Blood Sugar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                style={{ borderTopWidth: '4px', borderTopColor: '#2d9e8f' }}
              >
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-4xl mb-4">{test.icon}</div>
                  <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{test.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow">
                    {test.description}
                  </p>
                  
                  <div className="mt-auto">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Starting at</p>
                    <p className="text-3xl font-extrabold text-[#b91c1c] mb-6">₹{test.price}</p>
                    
                    <button 
                      onClick={(e) => handleBookTest(e, test.name)}
                      className="w-full bg-[#2d9e8f] text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Book This Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-16 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-lg text-gray-600 font-medium">
              No tests found. Call us at <a href="tel:+919602753579" className="text-[#b91c1c] font-bold hover:underline">+91 96027 53579</a> for help.
            </p>
          </div>
        )}

        {/* Bottom CTA Strip */}
        <div className="bg-[#b91c1c] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <p className="text-white text-lg font-bold md:max-w-2xl mb-6 md:mb-0 text-center md:text-left leading-relaxed">
            Don't see your test? We offer 500+ tests.<br />
            Call or WhatsApp us and we'll help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+919602753579"
              className="bg-white text-[#b91c1c] font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm"
            >
              📞 Call Now
            </a>
            <a 
              href="https://wa.me/919602753579"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#b91c1c] font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-center whitespace-nowrap shadow-sm"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
