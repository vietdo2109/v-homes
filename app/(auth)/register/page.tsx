import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./register-form";
import ContinueWithGoogleButton from "@/components/continue-with-google";
import Link from "next/link";

export default function Register() {
  return (
    <Card className="w-[680px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Register</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-center">
        <RegisterForm />
        <p className="text-zinc-700 font-medium text-center">OR</p>
        <ContinueWithGoogleButton />
        <p className="text-zinc-700 font-medium text-center">
          Already had an account?{" "}
          <Link href="/login" className="hover:underline text-sky-900 ">
            Login here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
