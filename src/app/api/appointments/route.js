import connectDB from "@/lib/db";
import { getIO } from "@/lib/socket";
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

    // ✅ CLEAN + SAFE MAPPING
    const appointmentData = {
      name: body.name,
      mobile: body.phone,
      email: body.email || "",
      city: body.city,
      bookingType: body.bookingType,
      testRequired: body.test,

      // 🔥 IMPORTANT FIX (date must be Date object)
      preferredDate: body.date ? new Date(body.date) : null,

      preferredTimeSlot: body.time,
      collectionType: body.collectionType,
      message: body.message || "",
      status: "pending",
    };

    // ✅ SAVE
    const appointment = await Appointment.create(appointmentData);

    // 🔥 REAL-TIME EMIT (SAFE)
    try {
      const { getIO } = await import("@/lib/socket");
      const io = getIO();

      io.emit("new-booking", appointment);
    } catch (err) {
      console.log("Socket not ready (safe skip)");
    }

    // ✅ RESPONSE
    return Response.json({
      success: true,
      data: appointment,
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
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

// =======================
// ✅ UPDATE STATUS
// =======================
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return Response.json(
        { success: false, message: "Missing id or status" },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return Response.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return Response.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}