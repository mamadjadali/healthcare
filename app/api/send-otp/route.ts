// app/api/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";

import otpStore from "@/lib/otp-store";

const KAVENEGAR_API_KEY = process.env.KAVENEGAR_API_KEY!;
const SENDER = "2000660110";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const { phone } = await req.json();
    console.log(
      `[PID: ${process.pid}] Received phone: "${phone}" (length: ${phone.length})`
    );

    if (!phone || !/^09\d{9}$/.test(phone.trim())) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const existing = await otpStore.get(phone); // Await the Promise
    if (existing) {
      console.log(
        `[PID: ${process.pid}] Active OTP exists for "${phone}": ${existing}`
      );
      return NextResponse.json(
        { error: "An OTP has already been sent. Please wait." },
        { status: 429 }
      );
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[PID: ${process.pid}] Generated OTP for "${phone}": ${code}`);

    const message = `کد تایید شما: ${code}`;
    const url = `https://api.kavenegar.com/v1/${KAVENEGAR_API_KEY}/sms/send.json`;
    const params = new URLSearchParams({
      receptor: phone,
      sender: SENDER,
      message,
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.return && data.return.status === 200) {
      await otpStore.set(phone, code);
      return NextResponse.json({ success: true, message: "SMS sent" });
    } else {
      console.error(`[PID: ${process.pid}] Kavenegar error:`, data);
      return NextResponse.json(
        { error: "Failed to send SMS", detail: data },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`[PID: ${process.pid}] SMS error:`, error);
    const err = error as Error;
    return NextResponse.json(
      { error: `Internal Server Error: ${err.message}` },
      { status: 500 }
    );
  }
}
