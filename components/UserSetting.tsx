"use client"; // Make sure this is a client component

import { Account, Client } from "appwrite"; // Ensure this points to your Appwrite client setup
import { useState } from "react";
import { toast } from "sonner"; // Assuming you are using Sonner for notifications

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust imports as necessary
import { Input } from "@/components/ui/input";

import { Label } from "./ui/label";

export default function UserSetting() {
  const [name, setName] = useState("Pedro Duarte"); // Default name
  const [password, setPassword] = useState("@peduarte"); // Default password
  const client = new Client();
  const account = new Account(client);
  const handleSaveChanges = async () => {
    try {
      // Update user name
      await account.updateName(name); // Update user's name

      // Update password
      await account.updatePassword(password); // Update user's password

      toast.success("Profile updated successfully!"); // Show success notification
    } catch (error) {
      toast.error("Failed to update profile. Please try again."); // Show error notification
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`&apos;`re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password" // Ensure it's a password field
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
