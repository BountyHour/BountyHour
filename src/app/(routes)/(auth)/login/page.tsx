import { Metadata } from "next";
import { FormLogin } from "@/app/(routes)/(auth)/login/form-login";
import { redirect } from "next/navigation";
import { authCheck } from "@/lib/authChecks";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your BountyHour account.",
};

export default async function RegisterPage() {
  const redirectUrl = await authCheck(false);
  if (redirectUrl) {
    return redirect(redirectUrl);
  }
  return <FormLogin />;
}
