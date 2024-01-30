import Link from "next/link";

import { cn } from "@/lib/utils";
import { MainNav } from "@/components/global/nav/main-nav";
import { ModeToggle } from "@/components/global/lightdark/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "@/server/auth";

export async function SiteHeader() {
  const session = await getServerAuthSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/*<CommandMenu /> // For now, no search */}
          </div>
          <nav className="flex items-center">
            <Link href="/" className="mr-6 flex items-center">
              {session ? "Sign out" : "Sign in"}
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
