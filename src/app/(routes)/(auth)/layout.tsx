import Image from "next/image";
import logo from "/public/images/branding/logo_transparent.png";
import Link from "next/link";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="container relative grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative inset-0 hidden min-h-screen flex-col items-center bg-muted p-10 dark:border-r lg:flex">
        <Image className="py-8" src={logo} alt="BountyHour logo" />
        <div className="relative z-20 flex text-center text-lg font-medium">
          Solve hard problems.
          <br />
          Help others.
          <br />
          Get paid.
        </div>
        <div className="relative z-20 mt-auto space-y-2 text-lg">
          <Link href="/help">Need help?</Link>
        </div>
      </div>
      <div className="relative mx-auto flex min-h-screen w-[350px] flex-col justify-center">
        {children}
      </div>
    </div>
  );
  //}
}
