import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { profileFormSchema } from "@/app/api/formschema/user";
import { setTimeout } from "timers/promises";
export const userRouter = createTRPCRouter({
  // Retrieve
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),

  // Update
  updateProfile: protectedProcedure
    .input(profileFormSchema)
    .mutation(async ({ ctx, input }) => {
      await setTimeout(2000);
      const result = ctx.db.user.update({
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

      return result;
    }),
});
