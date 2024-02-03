import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { profileFormSchema } from "@/app/api/formschema/user";

export const userRouter = createTRPCRouter({
  // Update
  updateProfile: protectedProcedure
    .input(profileFormSchema)
    .mutation(async ({ ctx, input }) => {
      const result = ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.displayName,
          username: input.username,
          about: input.about,
          timezone: input.timezone,
          privacy: input.privacy,
        },
      });

      return result;
    }),
});
