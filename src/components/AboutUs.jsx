export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl mb-6 leading-tight">
              AS MICRO & PATH LABS Exists to Put Your Health First
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Established with a vision to provide world-class diagnostic services, AS MICRO & PATH LABS is committed to delivering accurate and timely test results. We understand that behind every sample is a human life depending on our precision.
              </p>
              <p>
                Our laboratory is equipped with the latest fully automated machines and staffed by highly trained professionals. We adhere strictly to international quality control standards to ensure reliability in every report we generate.
              </p>
              <p>
                With a focus on patient convenience, we offer seamless home sample collection services and digital report delivery, making healthcare accessible right at your doorstep.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-900">Certified Laboratory</h4>
                  <p className="text-gray-500">Highest Quality Standards</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-teal-500/10 rounded-[3rem] transform -translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="About AS Micro & Path Labs" 
              className="relative z-10 rounded-[3rem] shadow-2xl w-full object-cover h-[600px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
