import { RegistrationSchema } from "@/schemas/registration.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useCreateRegistration = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RegistrationSchema) => {
      const res = await axios.post(
        `/api/users/${session?.user.id}/registrations`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    },
    onSuccess() {
      toast.success("Pendaftaran berhasil");
      queryClient.invalidateQueries({
        queryKey: ["registrations", session?.user.id],
      });
    },
    onError(err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    },
  });
};
