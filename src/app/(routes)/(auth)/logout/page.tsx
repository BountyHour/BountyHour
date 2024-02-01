import { Metadata } from "next";
import { FormLogout } from "@/app/(routes)/(auth)/logout/form-logout";
import { redirect } from "next/navigation";
import { authCheck } from "@/lib/authChecks";

export const metadata: Metadata = {
  title: "Log out",
  description: "Log out of your BountyHour account.",
};

export default async function RegisterPage() {
  const redirectUrl = await authCheck(true);
  if (redirectUrl) {
    return redirect(redirectUrl);
  }
  return <FormLogout />;
}
