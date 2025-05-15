"use client";

import "@cyntler/react-doc-viewer/dist/index.css";
import { Button } from "@/components/ui/button";
import { useUpdateMedicalStatus } from "@/hooks/features/use-update-medical-status";
import { DocViewerYuhu } from "../../components/doc-viewer";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "lodash";
import { FormComponent } from "../../components/form-component";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudentProfile } from "@/hooks/features/use-student-profile";
import { useRouter } from "next/navigation";
import { RejectionAlert } from "./rejection-alert";

export const DoctorPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateMedicalStatus();
  const { data } = useStudentProfile();

  return (
    <>
      <div className="space-y-4">
        {data && (
          <>
            <FormComponent item={data.data} />
            <Card>
              <CardHeader>
                <CardTitle>Surat Dokter</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge>{capitalize(data.data.doctorApproval)}</Badge>
                <DocViewerYuhu
                  uri={data.data.UploadedDocuments.suratDokter.uri}
                />
              </CardContent>
              <CardFooter className="space-x-2 justify-end">
                <Button
                  variant={"outline"}
                  className="border-green-300"
                  disabled={isPending}
                  onClick={() => mutate({ status: "APPROVE" })}
                >
                  Approve
                </Button>
                <Button
                  variant={"outline"}
                  className="border-red-300"
                  disabled={isPending}
                  onClick={() =>
                    router.push(
                      `/registration/${data.data.id}?reject_dialog_doctor=true`
                    )
                  }
                >
                  Reject
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
      <RejectionAlert />
    </>
  );
};
