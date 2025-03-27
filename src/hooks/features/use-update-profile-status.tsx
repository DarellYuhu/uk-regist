import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useUpdateProfileStatus = () => {
  const searchParams = useSearchParams();
  const formId = searchParams.get("formId");

  return useMutation({
    mutationFn: async (payload: { status: string }) => {
      const { data } = await axios.patch(
        `/api/registrations/${formId}/profile-status`,
        payload
      );
      return data;
    },
    onSuccess() {
      toast.success("Profile status updated");
    },
    onError() {
      toast.error("Failed to update profile status");
    },
  });
};
