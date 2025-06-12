import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 justify-center">
        <LoginForm />
      </CardContent>
    </Card>
  );
}
