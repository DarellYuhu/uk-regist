import { z } from "zod";

export const registrationSchema = z.object({
  namaIjazah: z.string().trim().min(1, "Required"),
  jenisKelamin: z.enum(["laki-laki", "perempuan"]),
  email: z.string().trim().min(1, "Required").email(),
  noTelp: z.string().trim().min(8),
  propinsiDomisili: z.string().trim().min(1, "Required"),
  asalSekolah: z.string().trim().min(1, "Required"),
  programStudi: z.string().trim().min(1, "Required"),
  suratDokter: z.instanceof(File),
});
export type RegistrationSchema = z.infer<typeof registrationSchema>;
