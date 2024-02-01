import { getServerAuthSession } from "@/server/auth";

export async function authCheck(required: boolean): Promise<string | null> {
  const session = await getServerAuthSession();

  if (required && !session?.user) {
    return "/login";
  } else if (!required && session?.user) {
    return "/logout";
  }
  return null;
}
