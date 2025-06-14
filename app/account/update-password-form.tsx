"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/client";
import { updatePasswordSchema } from "@/validation/updatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdatePasswordForm = () => {
  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const user = await auth.currentUser;

    if (!user?.email) {
      return;
    }

    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, data.currentPassword)
      );
      await updatePassword(user, data.newPassword);
      form.reset();
      toast.success("Successfully updated your password");
    } catch (e: any) {
      if (e.code === "auth/invalid-credential") {
        form.setError("currentPassword", {
          message: "Incorrect password",
        });
      }
      toast.error("Error!", {
        description:
          e.code === "auth/invalid-credential"
            ? "Invalid credentials"
            : "An error occurred",
      });
    }
  };

  return (
    <div className="pt-5 mt-5 border-t">
      <Form {...form}>
        <h2 className="text-2xl font-bold mb-5">Update Password</h2>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <fieldset
            className="flex flex-col gap-4"
            disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ml-0.5">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Current Password"
                      type="password"
                    />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ml-0.5">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      type="password"
                    />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ml-0.5">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm New Password"
                      type="password"
                    />
                  </FormControl>{" "}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Password</Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordForm;
