import { StudentProfile, SuratDokter } from "@prisma/client";
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

type Data = {
  message: string;
  data: (StudentProfile & { SuratDokter: SuratDokter & { uri: string } })[];
};
