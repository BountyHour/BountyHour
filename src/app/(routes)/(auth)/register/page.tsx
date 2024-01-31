import { Metadata } from "next";
import FormRegister from "@/app/(routes)/(auth)/register/form-register";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for a BountyHour account.",
};

export default function RegisterPage() {
  return <FormRegister />;
}
