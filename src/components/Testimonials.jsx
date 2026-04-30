import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      text: 'Very professional and prompt service. The home collection was done smoothly, and I received the reports online the same evening. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      text: 'I have been visiting AS MICRO & PATH LABS for my routine checkups for years. Their accuracy and hygiene standards are unmatched. Great team!',
      rating: 5,
    },
    {
      name: 'Meena Gupta',
      text: 'The staff is very polite and helpful. They explain the test requirements clearly. The clinic is spotless and very well maintained.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">What Our Patients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">&quot;{testimonial.text}&quot;</p>
              <div className="font-semibold text-gray-900">{testimonial.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
