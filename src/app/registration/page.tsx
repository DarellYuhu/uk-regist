"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneNumberInput from "@/components/ui/phone-number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegistrationPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="namaIjazah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Ijazah</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jenisKelamin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
                <RadioGroup
                  className="grid grid-cols-3 gap-2"
                  defaultValue="laki-laki"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <label className="border-input has-data-[state=checked]:border-ring focus-within:border-ring focus-within:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                    <RadioGroupItem
                      value={"laki-laki"}
                      className="sr-only after:absolute after:inset-0"
                    />
                    <p className="text-foreground text-sm leading-none font-medium">
                      Laki-laki
                    </p>
                  </label>
                  <label className="border-input has-data-[state=checked]:border-ring focus-within:border-ring focus-within:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50">
                    <RadioGroupItem
                      value={"perempuan"}
                      className="sr-only after:absolute after:inset-0"
                    />
                    <p className="text-foreground text-sm leading-none font-medium">
                      Perempuan
                    </p>
                  </label>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="email" {...field} />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <MailIcon size={16} aria-hidden="true" />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noTelp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Telp</FormLabel>
              <FormControl>
                <PhoneNumberInput
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propinsiDomisili"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propinsi Domisili</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asalSekolah"
          render={({ field }) => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="programStudi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Studi</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Program Studi" />
                  </SelectTrigger>
                  <SelectContent>
                    {prodiOption.map((item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}

type FormSchema = z.infer<typeof formSchema>;
const formSchema = z.object({
  namaIjazah: z.string(),
  jenisKelamin: z.enum(["laki-laki", "perempuan"]),
  email: z.string().email(),
  noTelp: z.string().min(8),
  propinsiDomisili: z.string(),
  asalSekolah: z.string(),
  programStudi: z.string(),
});

const prodiOption = [
  { label: "Akademi Sekretaris", value: "akademi_sekretaris" },
  { label: "Akuntansi", value: "akuntansi" },
  { label: "Filsafat Agama", value: "filsafat_agama" },
  { label: "Informatika", value: "informatika" },
  {
    label: "International Business Program (Accounting)",
    value: "international_business_program_accounting",
  },
  { label: "Keperawatan", value: "keperawatan" },
  { label: "Manajemen", value: "manajemen" },
  { label: "Pendidikan Bahasa Inggris", value: "pendidikan_bahasa_inggris" },
  {
    label: "Pendidikan Keagamaan Kristen",
    value: "pendidikan_keagamaan_kristen",
  },
  { label: "Pendidikan Ekonomi", value: "pendidikan_ekonomi" },
  { label: "Sistem Informasi", value: "sistem_informasi" },
  {
    label: "Teknologi Informasi (Desain & Animasi)",
    value: "teknologi_informasi_desain_animasi",
  },
  { label: "Arsitek", value: "arsitek" },
];
