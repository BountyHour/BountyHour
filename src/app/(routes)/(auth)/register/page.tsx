import { Metadata } from "next";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { FormCreateAccount } from "@/app/(routes)/(auth)/register/create-account";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for a BountyHour account.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden min-h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center py-8 text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Something useful should go here.
            <div></div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Mini sales pitch goes here* :)</p>
              <footer className="text-sm">* Conditions apply</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-screen w-[350px] flex-col justify-center">
          <FormCreateAccount />
        </div>
      </div>
    </>
  );
}
