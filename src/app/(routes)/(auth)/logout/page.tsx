import { Metadata } from "next";
import { FormLogout } from "@/app/(routes)/(auth)/logout/form-logout";

export const metadata: Metadata = {
  title: "Log out",
  description: "Log out of your BountyHour account.",
};

export default function RegisterPage() {
  return <FormLogout />;
}
