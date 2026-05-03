import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: false },
  city: { type: String, required: true },
  bookingType: { type: String, enum: ['package', 'individual'], required: true },
  testCategory: { type: String, required: false },
  testRequired: { type: String, required: true },
  preferredDate: { type: Date, required: true },
  preferredTimeSlot: { type: String, required: true },
  collectionType: { type: String, enum: ['home', 'clinic'], required: true },
  message: { type: String, required: false },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
