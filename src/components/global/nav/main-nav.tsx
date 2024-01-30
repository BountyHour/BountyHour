"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Receipt, PackageOpen } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="mr-4 flex sm:hidden">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Receipt className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Bounty<b className="text-primary">Hour</b>
          </span>
        </Link>
        <Link
          href="/docs"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs" ? "text-foreground" : "text-foreground/60",
          )}
        >
          <PackageOpen />
        </Link>
      </div>
      <div className="mr-4 hidden sm:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Receipt className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Bounty<b className="text-primary">Hour</b>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/docs"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/docs" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Docs
          </Link>
          <Link
            href="/docs/components"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/docs/components")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Components
          </Link>
          <Link
            href="/themes"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/themes")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Themes
          </Link>
          <Link
            href="/examples"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/examples")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Examples
          </Link>
          <Link
            href="https://github.com/bountyhour"
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block",
            )}
          >
            GitHub
          </Link>
        </nav>
      </div>
    </>
  );
}
