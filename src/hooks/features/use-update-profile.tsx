import { UpdateUserSchema } from "@/schemas/user.schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (payload: UpdateUserSchema) => {
      const { data } = await axios.patch(
        `/api/users/${session?.user.id}`,
        payload
      );
      return data;
    },
    onSuccess() {
      toast.success("User profile updated! Please re-signin to see changes");
    },
    onError() {
      toast.error("Fail update user profile");
    },
  });
};
