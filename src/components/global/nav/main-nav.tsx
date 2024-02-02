"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Receipt,
  HandCoins,
  LucideIcon,
  User,
  Hourglass,
  ShieldQuestion,
} from "lucide-react";

export function MainNav() {
  return (
    <>
      <div className="mr-4 flex">
        <Link href="/" className="mr-6 flex items-center">
          <Receipt className="h-6 w-6 text-primary" />
          <Hourglass className="h-6 w-6 text-primary" />
          <span className="mx-2 hidden font-bold sm:inline-block">
            Bounty<b className="text-primary">Hour</b>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <NavButton
            targetPathname="/bounty"
            text="Bounties"
            Icon={HandCoins}
          />
          <NavButton targetPathname="/help" text="Help" Icon={ShieldQuestion} />
        </nav>
      </div>
    </>
  );
}

interface NavButtonProps {
  targetPathname: string;
  text: string;
  Icon: LucideIcon;
}

export function NavButton({ targetPathname, text, Icon }: NavButtonProps) {
  const pathname = usePathname();
  return (
    <Link
      href={targetPathname}
      className={cn(
        "transition-colors hover:text-foreground",
        pathname === targetPathname
          ? "text-foreground"
          : "text-muted-foreground",
      )}
    >
      <span className="hidden sm:inline-block">{text}</span>
      <Icon className="sm:hidden" />
    </Link>
  );
}
