import { StudentProfile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export const useStudentProfile = () => {
  const params = useParams();

  return useQuery({
    queryKey: ["student-profile", params.profileId],
    enabled: !!params.profileId,
    queryFn: async () => {
      const { data } = await axios.get<Data>(
        `/api/registrations/${params.profileId}`
      );
      return data;
    },
  });
};

type Document = {
  name: string;
  path: string;
  uri: string;
};

type Data = {
  message: string;
  data: StudentProfile & {
    UploadedDocuments: {
      suratDokter: Document;
      ijazah: Document;
      kartuKeluarga: Document;
      aktaKelahiran: Document;
      suratBaptis: Document | null;
    };
  };
};
