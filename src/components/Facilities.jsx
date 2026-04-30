import { CheckCircle2 } from 'lucide-react';

export default function Facilities() {
  const facilitiesList = [
    'Advanced and fully automated diagnostic equipment',
    'Experienced & qualified pathologists',
    'Accurate, reliable & timely test reports',
    'Strict quality control & hygiene standards',
    'Patient-friendly sample collection process',
  ];

  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Facilities</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Advanced Diagnostics with Personal Care
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At AS MICRO & PATH LABS, we combine state-of-the-art technology with compassionate care to deliver precise results you can trust. Our facility is designed to provide maximum comfort and efficiency.
            </p>
            
            <ul className="space-y-4">
              {facilitiesList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-teal-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <a 
                href="#appointment"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Experience Our Care
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-3xl transform translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Laboratory Facilities" 
              className="relative z-10 rounded-3xl shadow-xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
