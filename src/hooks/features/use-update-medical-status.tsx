import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const useUpdateMedicalStatus = () => {
  const params = useParams();
  const profileId = params.profileId;

  return useMutation({
    mutationFn: async (payload: { status: string }) => {
      console.log(profileId);
      const { data } = await axios.patch(
        `/api/registrations/${profileId}/medical-status`,
        payload
      );
      return data;
    },
    onSuccess() {
      toast.success("Medical status updated");
    },
    onError() {
      toast.error("Failed to update medical status");
    },
  });
};
