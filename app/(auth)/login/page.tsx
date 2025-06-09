import ContinueWithGoogleButton from "@/components/continue-with-google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-center">
        <LoginForm />
        <p className="text-zinc-700 font-medium text-center">OR</p>
        <ContinueWithGoogleButton />
        <p className="text-zinc-700 font-medium text-center">
          Don't have an account?{" "}
          <Link href="/register" className="hover:underline text-sky-900 ">
            Register one here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
