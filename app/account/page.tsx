import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdatePasswordForm from "./update-password-form";
import DeleteAccountButton from "./delete-account-button";

const AccountPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    redirect("/");
  }
  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await auth.verifyIdToken(token);
  } catch (e) {
    redirect("/");
  }

  // Change password function only available fot users logging in using email & password
  const user = await auth.getUser(decodedToken.uid);
  const isPasswordProvider = !!user.providerData.find(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="max-w-screen-sm mx-auto">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Email</Label>
          <div className="my-1">{decodedToken.email}</div>

          {!!isPasswordProvider && <UpdatePasswordForm />}
        </CardContent>
        {!decodedToken.admin && (
          <CardFooter className="flex flex-col w-full gap-2 border-t items-start">
            <h2 className="text-red-500 text-2xl font-bold">Danger Zone</h2>
            <DeleteAccountButton />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AccountPage;
