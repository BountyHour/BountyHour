import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

// If a logged in user gets to a page that requires them to be logged out,
// redirect them to the home page
// Note: Inverse logic is handled in `@/middleware.ts`
export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerAuthSession();
  if (session) {
    return redirect("/");
  } else {
    return <>{children}</>;
  }
}
