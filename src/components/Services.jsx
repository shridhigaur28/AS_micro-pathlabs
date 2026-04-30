import { Activity, Droplet, Microscope, Pill, Stethoscope, HeartPulse } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Blood Tests',
      description: 'Comprehensive blood profiling including CBC, lipid profile, and blood sugar tests.',
      icon: <Droplet className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Biochemistry Tests',
      description: 'Advanced biochemical analysis for organ function and metabolic disorders.',
      icon: <Activity className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Histopathology',
      description: 'Microscopic examination of tissues for accurate diagnosis of diseases.',
      icon: <Microscope className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Microbiology Tests',
      description: 'Detection and identification of infectious agents and antibiotic susceptibility.',
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Immunology Tests',
      description: 'Evaluation of the immune system to detect autoimmune diseases and allergies.',
      icon: <Pill className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'Health Check-up Packages',
      description: 'Full body health check-up packages tailored for all age groups and needs.',
      icon: <HeartPulse className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Services</span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Comprehensive Pathology & Diagnostic Services
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We offer a wide range of specialized tests using advanced equipment to ensure the highest level of accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.description}
              </p>
              <a href="#appointment" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
