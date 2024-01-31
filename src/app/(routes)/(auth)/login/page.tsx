import { Metadata } from "next";
import { FormLogin } from "@/app/(routes)/(auth)/login/form-login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your BountyHour account.",
};

export default function RegisterPage() {
  return <FormLogin />;
}
