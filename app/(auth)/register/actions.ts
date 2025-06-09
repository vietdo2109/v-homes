"use server";

import { auth } from "@/firebase/server";
import { registerSchema } from "@/validation/registerSchema";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const validation = registerSchema.safeParse(data); // input data validation
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  // register new user
  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (e: any) {
    return {
      error: true,
      message: e.message ?? "Could not register user",
    };
  }
};
