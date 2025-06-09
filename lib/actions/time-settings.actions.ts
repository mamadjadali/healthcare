"use server";

import { ID, Query } from "node-appwrite";

import { DATABASE_ID, databases } from "../appwrite.config";
import { TimeSettings } from "@/types/appwrite.types";

const TIME_SETTINGS_COLLECTION_ID = "6846b481002cf1c899d9";

// Get time settings
export const getTimeSettings = async () => {
  try {
    const settings = await databases.listDocuments<TimeSettings>(
      DATABASE_ID!,
      TIME_SETTINGS_COLLECTION_ID,
      [Query.limit(1)]
    );

    if (settings.documents.length === 0) {
      return null;
    }

    return settings.documents[0];
  } catch (error) {
    console.error("Error fetching time settings:", error);
    throw error;
  }
};

// Update time settings
export const updateTimeSettings = async (timeSlots: string[]) => {
  try {
    // Check if settings exist
    const existingSettings = await getTimeSettings();

    if (existingSettings) {
      // Update existing settings
      const updatedSettings = await databases.updateDocument<TimeSettings>(
        DATABASE_ID!,
        TIME_SETTINGS_COLLECTION_ID,
        existingSettings.$id,
        {
          timeSlots,
          updatedAt: new Date().toISOString(),
        }
      );
      return updatedSettings;
    } else {
      // Create new settings
      const newSettings = await databases.createDocument<TimeSettings>(
        DATABASE_ID!,
        TIME_SETTINGS_COLLECTION_ID,
        ID.unique(),
        {
          timeSlots,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return newSettings;
    }
  } catch (error) {
    console.error("Error updating time settings:", error);
    throw error;
  }
}; 