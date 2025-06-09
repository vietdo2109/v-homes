"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { passwordValidation } from "@/validation/registerSchema";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { toast } from "sonner";
const loginSchema = z.object({
  email: z.string().email(),
  password: passwordValidation,
});

const LoginForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await auth?.loginWithEmail(data.email, data.password);
      router.refresh();
    } catch (e: any) {
      toast.error("Error!", {
        description:
          e.code === "auth/invalid-credential"
            ? "Invalid credentials"
            : "An error occurred",
      });
    }
    // const response = await registerUser(data);
    // if (!!response?.error) {
    //   toast.error("Error!", {
    //     description: response.message,
    //   });
    //   return;
    // }
    // toast.success("Your account created successfully");
  };
  return (
    <Form {...form}>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ml-0.5">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ml-0.5">Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>{" "}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">login</Button>
          <p className="text-zinc-700 font-medium">
            Forgotten your password?{" "}
            <Link href="/register" className="hover:underline text-sky-900">
              Reset it here
            </Link>
          </p>
        </fieldset>
      </form>
    </Form>
  );
};

export default LoginForm;
