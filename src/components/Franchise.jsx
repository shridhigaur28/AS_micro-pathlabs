'use client';
import { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

const stats = [
  { icon: '🏥', value: '10+', label: 'Years of Experience' },
  { icon: '😊', value: '10k+', label: 'Happy Patients' },
  { icon: '🧪', value: '500+', label: 'Tests Available' },
];

const WHATSAPP_NUMBER = '919910908530';

export default function Franchise() {
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', city: '', state: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())   newErrors.name   = 'Full name is required.';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required.';
    if (!form.city.trim())   newErrors.city   = 'City is required.';
    if (!form.state.trim())  newErrors.state  = 'State is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message =
      `Hello AS Micro Path Labs! I am interested in becoming a Franchise Partner. Here are my details:\n` +
      `Name: ${form.name}\n` +
      `Mobile: +91 ${form.mobile}\n` +
      `Email: ${form.email || 'N/A'}\n` +
      `City: ${form.city}\n` +
      `State: ${form.state}\n` +
      `Please get in touch with me at the earliest. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="franchise" className={`${poppins.className} bg-[#f0f6ff] py-16 md:py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Content ── */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 bg-[#1e3a6e] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c] inline-block" />
              Franchise Opportunity
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1a2e] leading-tight mb-5">
              Become a Franchise Partner with{' '}
              <span className="text-[#b91c1c]">AS Micro Path Labs</span>
            </h2>

            {/* Sub-description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              Join our network to start your own pathology collection centre backed by quality diagnostics, tech-enabled operations and ongoing support.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-[#1a1a2e]">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div id="franchise-form">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Form header */}
              <div className="bg-[#1e3a6e] px-8 py-6 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center">Apply to be a franchise partner</h3>
              </div>

              <form onSubmit={handleSubmit} noValidate className="px-8 py-8 space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                    Full Name <span className="text-[#b91c1c]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] transition ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                    Mobile Number <span className="text-[#b91c1c]">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 text-gray-600 text-sm font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`flex-1 border rounded-r-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] transition ${errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                    Email Address <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] transition"
                  />
                </div>

                {/* City + State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                      City <span className="text-[#b91c1c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur"
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] transition ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a2e] mb-1.5">
                      State <span className="text-[#b91c1c]">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="e.g. Rajasthan"
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] transition ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-4 rounded-lg transition-all duration-200 hover:scale-[1.01] shadow-md text-base mt-2 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.845L.057 23.571a.5.5 0 00.609.61l5.805-1.457A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.235-1.383l-.374-.222-3.884.976.999-3.79-.244-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Submit & Apply via WhatsApp
                </button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  Your details will be sent directly to us via WhatsApp. No spam, ever.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
