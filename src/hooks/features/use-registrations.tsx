import { StudentProfile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRegistrations = () => {
  return useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const data = await axios.get<Data>("/api/registrations");
      return data.data;
    },
  });
};

type Document = {
  name: string;
  path: string;
  uri: string;
};

export type Data = {
  message: string;
  data: (StudentProfile & {
    UploadedDocuments: {
      suratDokter: Document;
      ijazah: Document;
      kartuKeluarga: Document;
      aktaKelahiran: Document;
      suratBaptis: Document | null;
    };
  })[];
};
