import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const useUpdateProfileStatus = () => {
  const params = useParams();
  const profileId = params.profileId;

  return useMutation({
    mutationFn: async (payload: { status: string; comments?: string }) => {
      const { data } = await axios.patch(
        `/api/registrations/${profileId}/profile-status`,
        payload
      );
      return data;
    },
    onSuccess() {
      toast.success("Profile status updated");
    },
    onError(err) {
      if (err instanceof AxiosError) return toast.error(err.response?.data);
      toast.error("Failed to update profile status");
    },
  });
};
