/* eslint-disable import/no-anonymous-default-export */
import { Query } from "node-appwrite";

import { databases } from "@/lib/appwrite.config";

const DATABASE_ID = process.env.DATABASE_ID!;
const COLLECTION_ID = process.env.OTP_COLLECTION_ID!;

// Define the expected structure of an OTP document in your Appwrite collection
interface OtpDocument {
  $id: string;
  phone: string;
  code: string;
  timestamp: number;
}

export default {
  async set(phone: string, code: string): Promise<void> {
    const normalizedPhone = phone.trim();
    const timestamp = Date.now();

    try {
      console.log(
        `[Appwrite] Attempting to store OTP for "${normalizedPhone}"`
      );
      const existing = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("phone", normalizedPhone)]
      );

      if (existing.documents.length > 0) {
        const docId = (existing.documents[0] as unknown as OtpDocument).$id;
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
          phone: normalizedPhone,
          code,
          timestamp,
        });
        console.log(`[Appwrite] Updated OTP for "${normalizedPhone}": ${code}`);
      } else {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
          phone: normalizedPhone,
          code,
          timestamp,
        });
        console.log(`[Appwrite] Created OTP for "${normalizedPhone}": ${code}`);
      }
    } catch (err) {
      const error = err as Error;
      console.error(
        `[Appwrite] Failed to store OTP for "${normalizedPhone}": ${error.message}`
      );
      throw new Error(`Failed to store OTP: ${error.message}`);
    }
  },

  async get(phone: string): Promise<string | null> {
    const normalizedPhone = phone.trim();
    const currentTime = Date.now();

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("phone", normalizedPhone)]
      );

      if (response.documents.length === 0) {
        console.log(`[Appwrite] No OTP found for "${normalizedPhone}"`);
        return null;
      }

      const entry = response.documents[0] as unknown as OtpDocument;
      const timeDiff = currentTime - entry.timestamp;

      if (timeDiff < 5 * 60 * 1000) {
        console.log(
          `[Appwrite] Valid OTP for "${normalizedPhone}": ${entry.code}`
        );
        return entry.code;
      } else {
        console.log(
          `[Appwrite] OTP expired for "${normalizedPhone}" (age: ${timeDiff}ms)`
        );
        return null;
      }
    } catch (err) {
      const error = err as Error;
      console.error(
        `[Appwrite] Failed to retrieve OTP for "${normalizedPhone}": ${error.message}`
      );
      return null;
    }
  },

  async delete(phone: string): Promise<void> {
    const normalizedPhone = phone.trim();

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("phone", normalizedPhone)]
      );

      if (response.documents.length > 0) {
        const docId = (response.documents[0] as unknown as OtpDocument).$id;
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
        console.log(`[Appwrite] Deleted OTP for "${normalizedPhone}"`);
      } else {
        console.log(`[Appwrite] No OTP to delete for "${normalizedPhone}"`);
      }
    } catch (err) {
      const error = err as Error;
      console.error(
        `[Appwrite] Failed to delete OTP for "${normalizedPhone}": ${error.message}`
      );
    }
  },
};
