'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function AppointmentForm() {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();
  const [submitStatus, setSubmitStatus] = useState(null);

  const [bookingType, setBookingType] = useState(null);
  const [bookingTypeError, setBookingTypeError] = useState(false);

  useEffect(() => {
    const handlePreselect = (e) => {
      const val = e.detail;
      if (val.includes('Package')) {
        setBookingType('package');
      } else {
        setBookingType('individual');
      }
      setValue('testRequired', val);
      setBookingTypeError(false);
    };
    window.addEventListener('preselectTest', handlePreselect);
    return () => window.removeEventListener('preselectTest', handlePreselect);
  }, [setValue]);

  const handleTypeSelect = (type) => {
    setBookingType(type);
    setBookingTypeError(false);
    setValue('testRequired', '');
  };

  const onSubmit = async (data) => {
    if (!bookingType) {
      setBookingTypeError(true);
      return;
    }
    data.bookingType = bookingType;
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const successMessage = bookingType === 'package'
          ? 'Thank you! Your package booking request has been received. We will call you shortly to confirm.'
          : 'Thank you! Your test booking request has been received. We will call you shortly to confirm.';
        setSubmitStatus({ type: 'success', message: successMessage });
        reset();
        setBookingType(null);
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again or call us directly.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again or call us directly.' });
    }
  };

  const getDropdownLabel = () => {
    if (bookingType === 'package') return "Select Package *";
    if (bookingType === 'individual') return "Select Test *";
    return "Test / Service Required *";
  };

  return (
    <section id="appointment" className="py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Book Your Appointment</h2>
          <p className="text-lg text-gray-600">
            Fill in the form below and our team will confirm your appointment shortly.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            {submitStatus && (
              <div className={`mb-8 p-4 rounded-lg flex items-start ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitStatus.type === 'success' ? (
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                )}
                <span className="font-medium">{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center md:text-left">What would you like to book?</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('package')}
                    className={`flex-1 rounded-xl px-6 py-4 font-bold transition-all duration-200 border-2 flex items-center justify-center ${
                      bookingType === 'package' 
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c]' 
                        : 'bg-white text-[#1a1a2e] border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2 text-xl">📦</span> Health Package
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('individual')}
                    className={`flex-1 rounded-xl px-6 py-4 font-bold transition-all duration-200 border-2 flex items-center justify-center ${
                      bookingType === 'individual' 
                        ? 'bg-[#b91c1c] text-white border-[#b91c1c]' 
                        : 'bg-white text-[#1a1a2e] border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2 text-xl">🧪</span> Individual Test
                  </button>
                </div>
                {bookingTypeError && <p className="mt-2 text-sm text-red-600">Please select booking type</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Full name is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    {...register('mobile', { 
                      required: 'Mobile number is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="9876543210"
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City / Area *</label>
                  <input
                    type="text"
                    {...register('city', { required: 'City / Area is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="Your City"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{getDropdownLabel()}</label>
                  <select
                    {...register('testRequired', { required: 'Please select a test/package' })}
                    disabled={!bookingType}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    {!bookingType && (
                      <option value="">First select booking type above</option>
                    )}
                    
                    {bookingType === 'package' && (
                      <>
                        <option value="">Select a package...</option>
                        <option value="Silver Package">Silver Package</option>
                        <option value="Gold Package">Gold Package</option>
                        <option value="Platinum Package">Platinum Package</option>
                        <option value="Diamond Package">Diamond Package</option>
                      </>
                    )}

                    {bookingType === 'individual' && (
                      <>
                        <option value="">Select a test...</option>
                        <option value="Fasting Blood Sugar">Fasting Blood Sugar</option>
                        <option value="Lipid Profile (5 Tests)">Lipid Profile (5 Tests)</option>
                        <option value="Thyroid Profile (3 Tests)">Thyroid Profile (3 Tests)</option>
                        <option value="Kidney Function (10 Tests)">Kidney Function (10 Tests)</option>
                        <option value="Liver Function (8 Tests)">Liver Function (8 Tests)</option>
                        <option value="Complete Blood Count (19 Tests)">Complete Blood Count (19 Tests)</option>
                        <option value="HbA1c (1 Test)">HbA1c (1 Test)</option>
                        <option value="Vitamin B12 (1 Test)">Vitamin B12 (1 Test)</option>
                        <option value="Vitamin D 25-Hydroxy (1 Test)">Vitamin D 25-Hydroxy (1 Test)</option>
                        <option value="Other">Other</option>
                      </>
                    )}
                  </select>
                  {errors.testRequired && <p className="mt-1 text-sm text-red-600">{errors.testRequired.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('preferredDate', { required: 'Please select a date' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  />
                  {errors.preferredDate && <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slot *</label>
                  <select
                    {...register('preferredTimeSlot', { required: 'Please select a time slot' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors bg-white"
                  >
                    <option value="">Select a time slot...</option>
                    <option value="7:00 AM - 9:00 AM">7:00 AM - 9:00 AM</option>
                    <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                  </select>
                  {errors.preferredTimeSlot && <p className="mt-1 text-sm text-red-600">{errors.preferredTimeSlot.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Collection Type *</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="clinic"
                        {...register('collectionType', { required: 'Please select a collection type' })}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-600"
                      />
                      <span className="ml-2 text-gray-700">In-Clinic Visit</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="home"
                        {...register('collectionType', { required: 'Please select a collection type' })}
                        className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Home Collection</span>
                    </label>
                  </div>
                  {errors.collectionType && <p className="mt-1 text-sm text-red-600">{errors.collectionType.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message / Special Notes</label>
                <textarea
                  {...register('message')}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                  placeholder="Any specific instructions or requirements..."
                ></textarea>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Book My Appointment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
