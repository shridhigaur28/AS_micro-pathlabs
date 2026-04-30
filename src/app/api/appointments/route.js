import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Appointment from '@/models/Appointment';
import { sendAdminNotification } from '@/lib/mailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name, mobile, email, city, testRequired, bookingType,
      preferredDate, preferredTimeSlot, collectionType, message
    } = body;

    // Validation
    if (!name || !mobile || !city || !testRequired || !bookingType || !preferredDate || !preferredTimeSlot || !collectionType) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number' }, { status: 400 });
    }

    await connectDB();

    const newAppointment = await Appointment.create({
      name,
      mobile,
      email,
      city,
      testRequired,
      bookingType,
      preferredDate,
      preferredTimeSlot,
      collectionType,
      message,
    });

    // Send Admin Notification
    await sendAdminNotification(newAppointment);

    return NextResponse.json({ success: true, message: 'Appointment request received successfully.' }, { status: 201 });
  } catch (error) {
    console.error('API /appointments Error:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
