import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { BountyStatus } from "@prisma/client";

export const bountyRouter = createTRPCRouter({
  // Create
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bounty.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  // Read
  getCreatedBounties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.bounty.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getAssignedBounties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.bounty.findMany({
      orderBy: { createdAt: "desc" },
      where: { assignedTo: { id: ctx.session.user.id } },
    });
  }),

  getCreatedOrAssignedBounties: protectedProcedure.query(({ ctx }) => {
    return ctx.db.bounty.findMany({
      orderBy: { updatedAt: "desc" },
      where: {
        OR: [
          { createdBy: { id: ctx.session.user.id } },
          { assignedTo: { id: ctx.session.user.id } },
        ],
      },
    });
  }),

  getBountiesByTag: protectedProcedure
    .input(
      z.object({
        tags: z.array(z.string()),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.bounty.findMany({
        orderBy: { createdAt: "desc" },
        where: { tags: { some: { name: { in: input.tags } } } },
      });
    }),

  // Update
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number().positive(),
        status: z.nativeEnum(BountyStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = ctx.db.bounty.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      });

      // Save status change in history
      ctx.db.history.create({
        data: {
          bounty: { connect: { id: input.id } },
          status: input.status,
        },
      });

      return result;
    }),
});
