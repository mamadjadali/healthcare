import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

export async function POST(req: NextRequest) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        { success: false, error: "JWT configuration error" },
        { status: 500 }
      );
    }

    const { verified } = await req.json();
    
    const token = jwt.sign(
      { verified },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate token" },
      { status: 500 }
    );
  }
} 