import { postRouter } from "@/server/api/routers/post";
import { bountyRouter } from "@/server/api/routers/bounty";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  bounty: bountyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
