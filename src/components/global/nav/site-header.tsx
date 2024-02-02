import Link from "next/link";

import { MainNav } from "@/components/global/nav/main-nav";
import { ModeToggle } from "@/components/global/lightdark/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerAuthSession } from "@/server/auth";
import { Session } from "next-auth";

export async function SiteHeader() {
  const session = await getServerAuthSession();
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/*<CommandMenu /> // For now, no search */}
          </div>
          <nav className="flex items-center">
            <LoggedInAvatar session={session} />
            <LogInOutButton session={session} />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export function LogInOutButton({ session }: { session: Session | null }) {
  if (session) {
    return (
      <Link href="/logout" className="mr-4">
        Log out
      </Link>
    );
  } else {
    return (
      <Link href="/login" className="mr-4">
        Log in
      </Link>
    );
  }
}

export function LoggedInAvatar({ session }: { session: Session | null }) {
  if (session?.user?.image != null && session?.user?.name != null) {
    return (
      <Link href={`/profile`}>
        <Avatar className="mr-4">
          <AvatarImage src={session.user.image} alt={session.user.name} />
          <AvatarFallback>{session.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </Link>
    );
  }
  return;
}
