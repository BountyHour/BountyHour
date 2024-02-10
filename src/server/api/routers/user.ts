import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { profileFormSchema } from "@/app/api/formschema/user/profile";
import { withFieldMappedErrors } from "@/lib/prismaUtils";

export const userRouter = createTRPCRouter({
  // Retrieve
  getUser: protectedProcedure.query(async ({ ctx }) => {
    //await setTimeout(2000);
    console.log("looking up user!");
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),

  // Update
  updateProfile: protectedProcedure.input(profileFormSchema.partial()).mutation(
    withFieldMappedErrors(async ({ ctx, input }) => {
      //await setTimeout(2000);

      return await ctx.db.user.update({
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
    }),
  ),
});
