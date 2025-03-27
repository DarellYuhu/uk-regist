import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "@/schemas/user.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registrationSchema } from "@/schemas/registration.schema";
import { minio } from "@/lib/minio";
import { z } from "zod";
import { Status } from "@prisma/client";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/users", zValidator("json", createUserSchema), async (c) => {
  const payload = c.req.valid("json");
  const hash = await bcrypt.hash(payload.password, 10);
  payload.password = hash;
  const user = await prisma.user.create({
    data: payload,
  });

  return c.json(user);
});

app.get("/registrations", async (c) => {
  const data = await prisma.studentProfile.findMany({
    include: { SuratDokter: { include: { File: true } } },
  });
  const normalized = await Promise.all(
    data.map(async (item) => ({
      ...item,
      SuratDokter: {
        ...item.SuratDokter,
        uri: await minio.presignedUrl(
          "GET",
          "file",
          item.SuratDokter!.File.name
        ),
      },
    }))
  );
  return c.json({ message: "success", data: normalized });
});

app.patch(
  "/registrations/:id/medical-status",
  zValidator("json", z.object({ status: z.nativeEnum(Status) })),
  async (c) => {
    console.log("huhi");
    const payload = c.req.valid("json");
    const { id } = c.req.param();
    console.log(id);
    await prisma.studentProfile.update({
      where: { userId: id },
      data: { SuratDokter: { update: payload } },
    });
    return c.json({ message: "success" });
  }
);

app.get("/users/:id/registrations", async (c) => {
  const { id } = c.req.param();
  const data = await prisma.studentProfile.findUnique({
    where: { userId: id },
  });
  return c.json({ message: "success", data });
});

app.post(
  "/users/:id/registrations",
  zValidator("form", registrationSchema),
  async (c) => {
    const { id } = c.req.param();
    const { suratDokter, ...payload } = c.req.valid("form");
    const arrBuf = await suratDokter.arrayBuffer();
    const newName = `${Date.now()}_${suratDokter.name}`;
    const buffer = Buffer.from(arrBuf);
    await minio.putObject("file", newName, buffer, suratDokter.size);
    await prisma.studentProfile.create({
      data: {
        ...payload,
        userId: id,
        SuratDokter: {
          create: {
            File: { create: { name: newName, path: `file/${newName}` } },
          },
        },
      },
    });
    return c.json({ message: "success" });
  }
);

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
export const PATCH = handle(app);
