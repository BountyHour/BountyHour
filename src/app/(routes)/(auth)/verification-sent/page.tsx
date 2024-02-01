import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verification email sent",
  description: "Email verification email has been sent.",
};

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">
          Verification sent
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-center">
          A verification link has been sent to your email address.
        </p>
        <p className="text-center">
          Please check your inbox and click the link to verify your email
          address.
        </p>
      </CardContent>
    </Card>
  );
}
