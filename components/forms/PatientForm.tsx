"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ID } from "appwrite";
import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { FADE_IN_VARIANTS } from "@/constants/animation";
// import { createUser } from "@/lib/actions/patient.actions";
import { account } from "@/lib/appwrite-client";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";


export const PatientForm = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
       // Store name and phone in localStorage (used after login redirect)
      localStorage.setItem("patient:name", values.name);
      localStorage.setItem("patient:phone", values.phone);

      // Magic URL login
      await account.createMagicURLToken(
        ID.unique(), // user-defined session ID
        values.email,
        `${window.location.origin}/auth/callback` // Redirect after user clicks email link
      );

      alert("Check your email to continue");
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(555) 123-4567"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </motion.div>
  );
};
