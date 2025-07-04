import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "@/schemas/user.schema";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { registrationSchema } from "@/schemas/registration.schema";
import { z } from "zod";
import { Prisma, Status } from "@prisma/client";
import { uploadFile } from "@/utils/uploadFile";
import { minio } from "@/lib/minio";
import { generateNim } from "@/utils/generateNim";
import { HTTPException } from "hono/http-exception";

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

app.patch("/users/:id", zValidator("json", updateUserSchema), async (c) => {
  const { id } = c.req.param();
  const payload = c.req.valid("json");
  if (payload.password) {
    const hash = await bcrypt.hash(payload.password, 10);
    payload.password = hash;
  }
  const user = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return c.json(user);
});

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
    const {
      suratDokter,
      ijazah,
      kartuKeluarga,
      aktaKelahiran,
      suratBaptis,
      ...payload
    } = c.req.valid("form");
    const sd = await uploadFile(suratDokter);
    const i = await uploadFile(ijazah);
    const kk = await uploadFile(kartuKeluarga);
    const ak = await uploadFile(aktaKelahiran);
    let sb = null;
    if (suratBaptis) sb = await uploadFile(suratBaptis);
    await prisma.studentProfile.create({
      data: {
        ...payload,
        userId: id,
        UploadedDocuments: {
          create: {
            SuratDokter: {
              create: {
                name: sd,
                path: `file/${sd}`,
              },
            },
            Ijazah: {
              create: {
                name: i,
                path: `file/${i}`,
              },
            },
            KartuKeluarga: {
              create: {
                name: kk,
                path: `file/${kk}`,
              },
            },
            AktaKelahiran: {
              create: {
                name: ak,
                path: `file/${ak}`,
              },
            },
            SuratBaptis: sb
              ? {
                  create: {
                    name: sb,
                    path: `file/${sb}`,
                  },
                }
              : undefined,
          },
        },
      },
    });
    return c.json({ message: "success" });
  }
);

app.get("/registrations", async (c) => {
  const search = c.req.query("search");
  const isRegistered = c.req.query("isRegistered");
  const query: Prisma.StudentProfileFindManyArgs["where"] = {};
  if (search) {
    query.namaIjazah = {
      search,
    };
  }

  if (isRegistered === "true") {
    query.AND = [
      {
        status: "APPROVE",
      },
      {
        doctorApproval: "APPROVE",
      },
    ];
  }
  const data = await prisma.studentProfile.findMany({
    where: query,
    include: {
      UploadedDocuments: {
        include: {
          SuratDokter: true,
          AktaKelahiran: true,
          Ijazah: true,
          KartuKeluarga: true,
          StudentProfile: true,
          SuratBaptis: true,
        },
      },
    },
  });
  const normalized = await Promise.all(
    data.map(async (item) => ({
      ...item,
      UploadedDocuments: {
        suratDokter: {
          ...item.UploadedDocuments?.SuratDokter,
          uri: await minio.presignedUrl(
            "GET",
            "file",
            item.UploadedDocuments!.SuratDokter?.name
          ),
        },
        ijazah: {
          ...item.UploadedDocuments?.Ijazah,
          uri: await minio.presignedUrl(
            "GET",
            "file",
            item.UploadedDocuments!.Ijazah?.name
          ),
        },
        kartuKeluarga: {
          ...item.UploadedDocuments?.KartuKeluarga,
          uri: await minio.presignedUrl(
            "GET",
            "file",
            item.UploadedDocuments!.KartuKeluarga?.name
          ),
        },
        aktaKelahiran: {
          ...item.UploadedDocuments?.AktaKelahiran,
          uri: await minio.presignedUrl(
            "GET",
            "file",
            item.UploadedDocuments!.AktaKelahiran?.name
          ),
        },
        suratBaptis: item.UploadedDocuments!.SuratBaptis
          ? {
              ...item.UploadedDocuments?.SuratBaptis,
              uri: await minio.presignedUrl(
                "GET",
                "file",
                item.UploadedDocuments!.SuratBaptis?.name
              ),
            }
          : null,
      },
    }))
  );
  return c.json({ message: "success", data: normalized });
});

app.get("/registrations/:id", async (c) => {
  const { id } = c.req.param();
  const data = await prisma.studentProfile
    .findUniqueOrThrow({
      where: { id: +id },
      include: {
        RejectionMessage: true,
        UploadedDocuments: {
          include: {
            SuratDokter: true,
            AktaKelahiran: true,
            Ijazah: true,
            KartuKeluarga: true,
            StudentProfile: true,
            SuratBaptis: true,
          },
        },
      },
    })
    .catch(() => {
      throw new HTTPException(404, { message: "Data not found" });
    });
  const normalized = {
    ...data,
    UploadedDocuments: {
      suratDokter: {
        ...data.UploadedDocuments?.SuratDokter,
        uri: await minio.presignedUrl(
          "GET",
          "file",
          data.UploadedDocuments!.SuratDokter?.name
        ),
      },
      ijazah: {
        ...data.UploadedDocuments?.Ijazah,
        uri: await minio.presignedUrl(
          "GET",
          "file",
          data.UploadedDocuments!.Ijazah?.name
        ),
      },
      kartuKeluarga: {
        ...data.UploadedDocuments?.KartuKeluarga,
        uri: await minio.presignedUrl(
          "GET",
          "file",
          data.UploadedDocuments!.KartuKeluarga?.name
        ),
      },
      aktaKelahiran: {
        ...data.UploadedDocuments?.AktaKelahiran,
        uri: await minio.presignedUrl(
          "GET",
          "file",
          data.UploadedDocuments!.AktaKelahiran?.name
        ),
      },
      suratBaptis: data.UploadedDocuments!.SuratBaptis
        ? {
            ...data.UploadedDocuments?.SuratBaptis,
            uri: await minio.presignedUrl(
              "GET",
              "file",
              data.UploadedDocuments!.SuratBaptis?.name
            ),
          }
        : null,
    },
  };
  return c.json({ message: "success", data: normalized });
});

app.patch(
  "/registrations/:id/medical-status",
  zValidator(
    "json",
    z.object({ status: z.nativeEnum(Status), comments: z.string().optional() })
  ),
  async (c) => {
    const payload = c.req.valid("json");
    const { id } = c.req.param();
    console.log(payload, id);
    if (payload.comments)
      await prisma.rejectionMessage.upsert({
        where: { studentProfileId: +id },
        update: {
          doctor: payload.comments,
        },
        create: {
          studentProfileId: +id,
          doctor: payload.comments,
        },
      });
    await prisma.studentProfile.update({
      where: { id: +id },
      data: { doctorApproval: payload.status },
    });
    return c.json({ message: "success" });
  }
);

app.patch(
  "/registrations/:id/profile-status",
  zValidator(
    "json",
    z.object({ status: z.nativeEnum(Status), comments: z.string().optional() })
  ),
  async (c) => {
    const { status, comments } = c.req.valid("json");
    const payload: Prisma.StudentProfileUpdateInput = { status };
    const { id } = c.req.param();
    const latest = await prisma.nomorUrut.findFirst({
      orderBy: { createdAt: "desc" },
    });
    const user = await prisma.studentProfile.findUniqueOrThrow({
      where: { id: +id },
    });
    if (user.status !== "WAITING")
      throw new HTTPException(400, { message: "Registrasi sudah di proses" });
    if (payload.status === "APPROVE")
      payload.nomorIndukMahasiswa = generateNim(
        user.programStudi,
        latest?.id ?? 0
      );
    await prisma.rejectionMessage.upsert({
      create: {
        studentProfileId: +id,
        registrar: comments,
      },
      update: {
        registrar: comments,
      },
      where: {
        studentProfileId: +id,
      },
    });
    await prisma.studentProfile.update({
      where: { id: +id },
      data: payload,
    });
    if (payload.status === "APPROVE")
      await prisma.nomorUrut.create({
        data: { id: latest?.id ? latest.id + 1 : 0 + 1 },
      });
    return c.json({ message: "success" });
  }
);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
