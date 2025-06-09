"use server";

import { ID, Query } from "node-appwrite";

import { DATABASE_ID, databases } from "../appwrite.config";
import { Settings } from "@/types/appwrite.types";

const SETTINGS_COLLECTION_ID = "6846ac1a00045a2be025";

// Get clinic settings
export const getClinicSettings = async () => {
  try {
    const settings = await databases.listDocuments<Settings>(
      DATABASE_ID!,
      SETTINGS_COLLECTION_ID,
      [Query.limit(1)]
    );

    if (settings.documents.length === 0) {
      return null;
    }

    return settings.documents[0];
  } catch (error) {
    console.error("Error fetching clinic settings:", error);
    throw error;
  }
};

// Update clinic settings
export const updateClinicSettings = async (workingDays: string[]) => {
  try {
    // Check if settings exist
    const existingSettings = await getClinicSettings();

    if (existingSettings) {
      // Update existing settings
      const updatedSettings = await databases.updateDocument<Settings>(
        DATABASE_ID!,
        SETTINGS_COLLECTION_ID,
        existingSettings.$id,
        {
          workingDays,
          updatedAt: new Date().toISOString(),
        }
      );
      return updatedSettings;
    } else {
      // Create new settings
      const newSettings = await databases.createDocument<Settings>(
        DATABASE_ID!,
        SETTINGS_COLLECTION_ID,
        ID.unique(),
        {
          workingDays,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return newSettings;
    }
  } catch (error) {
    console.error("Error updating clinic settings:", error);
    throw error;
  }
}; 