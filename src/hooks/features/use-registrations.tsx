import { StudentProfile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export const useRegistrations = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  return useQuery({
    queryKey: ["registrations", search || ""],
    queryFn: async () => {
      const data = await axios.get<Data>("/api/registrations", {
        params: { search },
      });
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
