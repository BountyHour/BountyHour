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
          const handledError = handlePrismaError(e);
          if (handledError != null) {
            console.log("TEST" + handledError.field);
            throw handledError;
          } else {
            throw e;
          }
        } else {
          throw e;
        }
      }
    }),
});

// https://www.prisma.io/docs/orm/reference/error-reference
// https://stackoverflow.com/a/75600318/608312
const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError) => {
  switch (err.code) {
    case "P2002":
      return new Error(
        `${err.meta.target}: The chosen ${err.meta.target} is already in use, please try another.`,
      );
    case "P2003":
      return new Error(
        `${err.meta.target}: The entered ${err.meta.target} doesn't match, please check it is correct and try again.`,
      );
    default:
      return new Error(
        `${err.meta.target}: Something went wrong whilst saving, please check the form for errors.`,
      );
  }
};
