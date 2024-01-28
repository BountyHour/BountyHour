import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { DeletePost } from "@/app/_components/delete-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { late } from "zod";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4e3115] to-[#0f0b07] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Bounty <span className="text-[hsl(27,62%,54%)]">Hour</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">Pinging</h3>
            <div className="text-lg">
              <b>Ping tRPC: </b>
              {hello ? hello.greeting : "Loading tRPC query..."}
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">Authing</h3>
            <p className="text-lg">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <SubmitPost />
          </div>
          <div className="flex w-full flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <ReadPost />
          </div>
        </div>
      </div>
    </main>
  );
}

async function SubmitPost() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <>
      <h3 className="text-2xl font-bold">Submitting Post</h3>
      <CreatePost />
    </>
  );
}

async function ReadPost() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const last5Posts = await api.post.getLast5.query();

  return (
    <>
      <h3 className="text-2xl font-bold">Reading Post</h3>
      {last5Posts.length > 0 ? (
        last5Posts.map((item) => (
          <p key={item.id} className="truncate">
            Post: <i>{item.name}</i> <DeletePost id={item.id} />
            <br />
            {item.createdAt.toLocaleString()}
          </p>
        ))
      ) : (
        <p>You have no posts yet.</p>
      )}
    </>
  );
}
