import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verification email sent",
  description: "Email verification email has been sent.",
};

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Check your email</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-center">
          A verification email has been sent to your email address. Please check
          your inbox and click the link to verify your email address.
        </p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
