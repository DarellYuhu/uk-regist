"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUploader } from "@/components/ui/file-uploader";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useCreateRegistration } from "@/hooks/features/use-create-registration";
import { useRegistration } from "@/hooks/features/use-registration";
import {
  registrationSchema,
  RegistrationSchema,
} from "@/schemas/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon, InfoIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const StudentPage = () => {
  const { data } = useRegistration();
  const { mutate, isPending } = useCreateRegistration();
  const form = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      namaIjazah: "",
      jenisKelamin: "laki-laki",
      email: "",
      noTelp: "",
      propinsiDomisili: "",
      asalSekolah: "",
      programStudi: "",
    },
  });

  const onSubmit = (data: RegistrationSchema) => {
    mutate(data);
  };

  return (
    <div className="space-y-2">
      {data?.data ? (
        <div className="rounded-md border px-4 py-3">
          <p className="text-sm">
            <InfoIcon
              className="me-3 -mt-0.5 inline-flex text-blue-500"
              size={16}
              aria-hidden="true"
            />
            Data pendaftaran kamu sudah masuk, ditunggu info selanjutnya ya 🎉
          </p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Formulir Pendaftaran</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
                id="registration-form"
              >
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
                      <FormLabel>Asal Sekolah</FormLabel>
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Program Studi" />
                          </SelectTrigger>
                          <SelectContent>
                            {prodiOption.map((item, idx) => (
                              <SelectItem value={item.value} key={idx}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="suratDokter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surat Kesehatan Sehat</FormLabel>
                      <FormControl>
                        <FileUploader
                          maxSize={1024 * 1024 * 10}
                          onValueChange={(val) => field.onChange(val[0])}
                          accept={{ "application/pdf": [] }}
                          multiple={false}
                        />
                      </FormControl>
                      <FormDescription>Image or PDF</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="submit" form="registration-form" disabled={isPending}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      )}
      {data?.data?.status === "APPROVE" && (
        <div className="border-eborder rounded-md border px-4 py-3">
          <p className="text-sm">
            <CircleCheckIcon
              className="me-3 -mt-0.5 inline-flex text-emerald-500"
              size={16}
              aria-hidden="true"
            />
            Selamat data anda sudah diterima!
          </p>
        </div>
      )}
    </div>
  );
};

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
