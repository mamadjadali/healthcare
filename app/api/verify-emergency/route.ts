import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const emergencyToken = process.env.EMERGENCY_ACCESS_TOKEN;

    if (!emergencyToken) {
      console.error("Emergency token not configured in environment");
      return NextResponse.json(
        { success: false, error: "Emergency access not configured" },
        { status: 500 }
      );
    }

    if (token === emergencyToken) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid emergency token" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Emergency verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
} 