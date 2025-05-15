import { z } from "zod";

export const registrationSchema = z.object({
  namaIjazah: z.string().trim().min(1, "Required"),
  jenisKelamin: z.enum(["laki-laki", "perempuan"]),
  email: z.string().trim().min(1, "Required").email(),
  noTelp: z.string().trim().min(8),
  propinsiDomisili: z.string().trim().min(1, "Required"),
  asalSekolah: z.string().trim().min(1, "Required"),
  programStudi: z.string().trim().min(1, "Required"),
  tempatLahir: z.string().trim().min(1, "Required"),
  alamat: z.string().trim().min(1, "Required"),
  testMatematika: z.coerce.number().max(100).min(0),
  testBahasaInggris: z.coerce.number().max(100).min(0),
  tanggalLahir: z.union([z.date(), z.string()]),

  suratDokter: z.instanceof(File),
  ijazah: z.instanceof(File),
  kartuKeluarga: z.instanceof(File),
  aktaKelahiran: z.instanceof(File),
  suratBaptis: z.instanceof(File).optional(),
});
export type RegistrationSchema = z.infer<typeof registrationSchema>;
