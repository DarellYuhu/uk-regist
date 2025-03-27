import { StudentProfile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

export const useRegistration = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["registrations", session?.user.id],
    queryFn: async () => {
      const { data } = await axios.get<Data>(
        `/api/users/${session?.user.id}/registrations`
      );
      return data;
    },
    enabled: !!session,
  });
};

type Data = {
  message: string;
  data: StudentProfile | null;
};
