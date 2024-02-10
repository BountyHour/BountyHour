import { Timezone, ProfilePrivacy } from "@prisma/client";
import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(25, {
      message: "Display name must not be longer than 25 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(25, {
      message: "Username must not be longer than 25 characters.",
    }),
  about: z
    .string()
    .max(160, "About must not be longer than 160 characters.")
    .optional(),
  timezone: z.nativeEnum(Timezone),
  privacy: z.nativeEnum(ProfilePrivacy),
});
