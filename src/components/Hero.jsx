'use client';
export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Laboratory Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 mix-blend-multiply" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Trusted Pathology Lab for Accurate & Reliable Test Results
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto lg:mx-0">
            Fast, accurate and affordable pathology tests with home sample collection and digital reports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Appointment
            </button>
            <a 
              href="tel:+919602753579"
              className="w-full sm:w-auto bg-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              Call Now: +91 96027 53579
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-sm text-gray-500 font-medium">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50k+</div>
            <div className="text-sm text-gray-500 font-medium">Happy Patients</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-500 font-medium">Tests Available</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-teal-500 mb-2">99%</div>
            <div className="text-sm text-gray-500 font-medium">Accurate Reports</div>
          </div>
        </div>
      </div>
    </section>
  );
}
