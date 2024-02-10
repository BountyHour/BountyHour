import { Metadata } from "next";
import Image from "next/image";
import {
  User,
  PaintRoller,
  Receipt,
  MessageSquareHeart,
  Lock,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/(routes)/profile/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: <User />,
  },
  {
    title: "Appearance",
    href: "/profile/appearance",
    icon: <PaintRoller />,
  },
  {
    title: "Bounties",
    href: "/profile/bounties",
    icon: <Receipt />,
  },
  {
    title: "Feedback",
    href: "/profile/feedback",
    icon: <MessageSquareHeart />,
  },
  {
    title: "Security",
    href: "/profile/security",
    icon: <Lock />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="m-10 my-16 block space-y-6 md:px-10">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings, bounties, and feedback.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
