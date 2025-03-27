import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  displayName: z.string().trim().min(1, "Required"),
  username: z.string().trim().min(1, "Required"),
  password: z.string().trim().min(1, "Required"),
  role: z.nativeEnum(Role),
});

export const updateUserSchema = z.object({
  displayName: z.string().optional(),
  password: z.string().optional(),
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
