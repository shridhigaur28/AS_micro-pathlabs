export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // Debug (optional - can remove later)
    console.log("LOGIN ATTEMPT:", email, password);

    // Check credentials from .env.local
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return Response.json({
        success: true,
        message: "Login successful",
      });
    }

    return Response.json(
      {
        success: false,
        message: "Invalid email or password",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}