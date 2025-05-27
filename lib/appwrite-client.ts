// lib/appwrite.config.ts
import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // must start with NEXT_PUBLIC_ to be accessible in browser
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!); // also must be public

export const account = new Account(client);