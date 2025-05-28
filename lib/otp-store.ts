// lib/otp-store.ts
import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('otp-store.json');
const db = new Low(adapter);
await db.read();
db.data ||= { otps: {} };

export default {
  async set(phone: string, code: string) {
    const normalizedPhone = phone.trim();
    const timestamp = Date.now();
    db.data.otps[normalizedPhone] = { code, timestamp };
    await db.write();
    console.log(`[PID: ${process.pid}] Stored OTP for "${normalizedPhone}": ${code} at ${timestamp}`);
  },
  async get(phone: string) {
    await db.read();
    const normalizedPhone = phone.trim();
    const entry = db.data.otps[normalizedPhone];
    const currentTime = Date.now();
    console.log(`[PID: ${process.pid}] Retrieving OTP for "${normalizedPhone}" at ${currentTime}`);
    if (entry) {
      const timeDiff = currentTime - entry.timestamp;
      console.log(`Found entry: code=${entry.code}, age=${timeDiff}ms`);
      if (timeDiff < 5 * 60 * 1000) {
        console.log(`Valid OTP for "${normalizedPhone}": ${entry.code}`);
        return entry.code;
      }
      console.log(`OTP for "${normalizedPhone}" expired (age: ${timeDiff}ms)`);
    } else {
      console.log(`No entry found for "${normalizedPhone}"`);
    }
    return null;
  },
  async delete(phone: string) {
    const normalizedPhone = phone.trim();
    delete db.data.otps[normalizedPhone];
    await db.write();
    console.log(`[PID: ${process.pid}] Deleted OTP for "${normalizedPhone}"`);
  },
};