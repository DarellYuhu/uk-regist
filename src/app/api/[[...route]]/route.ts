import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { CreateUserSchema } from "@/schemas/user.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignInSchema } from "@/schemas/auth.schema";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/users", zValidator("json", CreateUserSchema), async (c) => {
  const payload = c.req.valid("json");
  const hash = await bcrypt.hash(payload.password, 10);
  payload.password = hash;
  const user = await prisma.user.create({
    data: payload,
  });

  return c.json(user);
});

// app.post("/auth/sign-in", zValidator("json", SignInSchema), async (c) => {
//   const payload = c.req.valid("json");
//   const user = await prisma.user
//     .findUniqueOrThrow({ where: { username: payload.username } })
//     .catch(() => {
//       throw new HTTPException(401, { message: "Invalid credential" });
//     });
//   const verified = await bcrypt.compare(payload.password, user.password);
//   if (!verified)
//     throw new HTTPException(401, { message: "Invalid credential" });
//   return c.json(user);
// });

export const GET = handle(app);
export const POST = handle(app);
