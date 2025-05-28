// app/api/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

import otpStore from '@/lib/otp-store';

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    console.log(`[PID: ${process.pid}] Raw request body: ${JSON.stringify({ phone, code })}`);
    console.log(`[PID: ${process.pid}] Received verify request: phone="${phone}", code="${code}"`);

    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone and code are required' }, { status: 400 });
    }

    const storedCode = otpStore.get(phone);
    console.log(`[PID: ${process.pid}] Verifying OTP for "${phone}": received=${code}, stored=${storedCode}`);

    if (!storedCode) {
      return NextResponse.json({ error: 'OTP not found or expired' }, { status: 401 });
    }

    if (storedCode === code.toString()) {
      otpStore.delete(phone);
      return NextResponse.json({ success: true, phone });
    }

    return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
  } catch (error) {
    console.error(`[PID: ${process.pid}] Verify OTP error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}