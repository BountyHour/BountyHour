import { getServerAuthSession } from "@/server/auth";

export async function redirectIfUnauthed() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return null;
  }
}
