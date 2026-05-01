import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";

// =======================
// ✅ GET ALL APPOINTMENTS
// =======================
export async function GET() {
  try {
    await connectDB();

    const appointments = await Appointment.find().sort({ createdAt: -1 });

    return Response.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("GET ERROR:", error);

    return Response.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// =======================
// ✅ CREATE APPOINTMENT
// =======================
export async function POST(req) {
  try {
    const body = await req.json();

    await connectDB();

    // 🔥 IMPORTANT MAPPING (DO NOT REMOVE)
    const appointmentData = {
      name: body.name,
      mobile: body.phone, // mapped
      email: body.email,
      city: body.city,
      bookingType: body.bookingType,
      testRequired: body.test, // mapped
      preferredDate: body.date, // mapped
      preferredTimeSlot: body.time, // mapped
      collectionType: body.collectionType,
      message: body.message,
    };

    const appointment = await Appointment.create(appointmentData);

    return Response.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// =======================
// ✅ DELETE APPOINTMENT
// =======================
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    await connectDB();

    await Appointment.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}