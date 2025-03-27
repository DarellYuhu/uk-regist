import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().trim().min(1, "Required"),
  password: z.string().trim().min(1, "Required"),
});
