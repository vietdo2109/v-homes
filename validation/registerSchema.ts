import { z } from "zod";
export const passwordValidation = z.string().refine(
  (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value);
  },
  {
    message:
      "Message must be at least 6 character-long, and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and a special chatacter.",
  }
);

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email(),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.confirmPassword !== data.password) {
      context.addIssue({
        message: "passwords must match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
