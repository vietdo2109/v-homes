import { z } from "zod";
export const passwordValidation = z.string().refine(
  (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value);
  },
  {
    message:
      "Password must be at least 6 character-long, and contains at least 1 uppercase letter, 1 lowercase letter, 1 number, and a special chatacter.",
  }
);

export const updatePasswordSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmNewPassword: z.string(),
  })
  .superRefine((data, context) => {
    if (data.newPassword !== data.confirmNewPassword) {
      context.addIssue({
        message: "passwords must match",
        path: ["confirmNewPassword"],
        code: "custom",
      });
    }
  });
