import { cookies } from "next/headers";

import { account, client } from "./appwrite-client";

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    // Use getAll() to get all cookies and find the Appwrite session cookie
    const sessionCookie = cookieStore.getAll().find((cookie) => cookie.name.startsWith("a_session_"));
    const jwt = sessionCookie ? sessionCookie.value : null;
    if (!jwt) return null;
    client.setJWT(jwt);
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}