import Image from "next/image";
import logo from "/public/images/branding/logo_transparent.png";
import Link from "next/link";
import { Receipt, Hourglass } from "lucide-react";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative inset-0 hidden min-h-screen flex-grow flex-col items-center bg-muted p-10 dark:border-r lg:flex">
        <div className="relative m-auto flex flex-col items-center p-10">
          <div className="flex items-center">
            <Receipt className="h-24 w-24 text-primary" />
            <Hourglass className="h-24 w-24 text-primary" />
          </div>
          <span className="my-10 text-5xl font-bold">
            Bounty<b className="text-primary">Hour</b>
          </span>
          <div className="relative z-20 text-center text-lg font-medium">
            Solve hard problems.
            <br />
            Help others.
            <br />
            Get paid.
          </div>
        </div>
        <div className="relative z-20 space-y-2 text-lg">
          <Link href="/help">Need help?</Link>
        </div>
      </div>
      <div className="relative mx-auto flex min-h-screen w-[350px] flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
