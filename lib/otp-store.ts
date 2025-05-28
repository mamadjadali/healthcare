import { Query } from 'node-appwrite';

import { databases } from '@/lib/appwrite.config';

const DATABASE_ID = process.env.DATABASE_ID!;
const COLLECTION_ID = process.env.OTP_COLLECTION_ID!;

export default {
  async set(phone: string, code: string): Promise<void> {
    const normalizedPhone = phone.trim();
    const timestamp = Date.now();

    try {
      console.log(`[Appwrite] Attempting to store OTP for "${normalizedPhone}" in DB:${DATABASE_ID}, Collection:${COLLECTION_ID}`);
      const existing = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('phone', normalizedPhone)]
      );

      if (existing.documents.length > 0) {
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          existing.documents[0].$id,
          {
            phone: normalizedPhone,
            code,
            timestamp,
          }
        );
        console.log(`[Appwrite] Updated OTP for "${normalizedPhone}": ${code} at ${timestamp}`);
      } else {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          'unique()',
          {
            phone: normalizedPhone,
            code,
            timestamp,
          }
        );
        console.log(`[Appwrite] Created OTP for "${normalizedPhone}": ${code} at ${timestamp}`);
      }
    } catch (err) {
      console.error(`[Appwrite] Failed to store OTP for "${normalizedPhone}":`, err);
      throw new Error(`Failed to store OTP: ${err.message}`);
    }
  },

  async get(phone: string): Promise<string | null> {
    const normalizedPhone = phone.trim();
    const currentTime = Date.now();

    try {
      console.log(`[Appwrite] Querying OTP for "${normalizedPhone}" in DB:${DATABASE_ID}, Collection:${COLLECTION_ID}`);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('phone', normalizedPhone)]
      );

      if (response.documents.length === 0) {
        console.log(`[Appwrite] No OTP found for "${normalizedPhone}"`);
        return null;
      }

      const entry = response.documents[0];
      const timeDiff = currentTime - entry.timestamp;
      console.log(`[Appwrite] Found OTP: code=${entry.code}, age=${timeDiff}ms`);

      if (timeDiff < 5 * 60 * 1000) {
        console.log(`[Appwrite] Valid OTP for "${normalizedPhone}": ${entry.code}`);
        return entry.code;
      }

      console.log(`[Appwrite] OTP expired for "${normalizedPhone}" (age: ${timeDiff}ms)`);
      return null;
    } catch (err) {
      console.error(`[Appwrite] Failed to retrieve OTP for "${normalizedPhone}":`, err);
      return null;
    }
  },

  async delete(phone: string): Promise<void> {
    const normalizedPhone = phone.trim();

    try {
      console.log(`[Appwrite] Deleting OTP for "${normalizedPhone}"`);
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('phone', normalizedPhone)]
      );

      if (response.documents.length > 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          COLLECTION_ID,
          response.documents[0].$id
        );
        console.log(`[Appwrite] Deleted OTP for "${normalizedPhone}"`);
      }
    } catch (err) {
      console.error(`[Appwrite] Failed to delete OTP for "${normalizedPhone}":`, err);
    }
  },
};