import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { profileFormSchema } from "@/app/api/formschema/user";
import { Prisma } from "@prisma/client";
import { setTimeout } from "timers/promises";

export const userRouter = createTRPCRouter({
  // Retrieve
  getUser: protectedProcedure.query(async ({ ctx }) => {
    //await setTimeout(2000);
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),

  // Update
  updateProfile: protectedProcedure
    .input(profileFormSchema.partial())
    .mutation(async ({ ctx, input }) => {
      //await setTimeout(2000);

      try {
        await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            name: input.name,
            username: input.username,
            about: input.about,
            timezone: input.timezone,
            privacy: input.privacy,
          },
        });
      } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002" && e.meta.target.includes("username")) {
            throw new Error("username:Username already taken");
          }
        } else {
          throw e;
        }
      }
    }),
});
