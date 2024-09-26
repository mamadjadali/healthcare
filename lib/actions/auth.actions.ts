import { ID } from "node-appwrite";

import { account } from "../appwrite.config"; // Adjust the import path as needed

// Define a custom error type for better type handling
interface AppwriteError extends Error {
  // No need to redefine message, we can just use it from Error interface
}

// Signup function to create a new user
export const signup = async (email: string, password: string) => {
  try {
    const user = await account.create(ID.unique(), email, password);
    return user; // User created successfully
  } catch (error) {
    // Cast error to AppwriteError and throw a new error
    throw new Error(
      (error as AppwriteError).message || "Failed to create account"
    );
  }
};

// Login function to authenticate the user
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session; // User logged in successfully
  } catch (error) {
    // Cast error to AppwriteError and throw a new error
    throw new Error((error as AppwriteError).message || "Failed to log in");
  }
};

// Function to check if the user is authenticated
export const checkAuth = async () => {
  try {
    const user = await account.get(); // Get user account information
    return user; // User is logged in
  } catch (error) {
    // Cast error to AppwriteError and return null
    return null; // User is not logged in
  }
};

// Logout function to end user session
export const logout = async () => {
  try {
    await account.deleteSession("current"); // Logout current session
  } catch (error) {
    // Cast error to AppwriteError and throw a new error
    throw new Error((error as AppwriteError).message || "Failed to log out");
  }
};
