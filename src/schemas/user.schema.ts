import { Role } from "@prisma/client";
import { z } from "zod";

export const CreateUserSchema = z.object({
  displayName: z.string().trim().min(1, "Required"),
  username: z.string().trim().min(1, "Required"),
  password: z.string().trim().min(1, "Required"),
  role: z.nativeEnum(Role),
});
