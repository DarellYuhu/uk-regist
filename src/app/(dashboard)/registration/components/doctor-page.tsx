"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegistrations } from "@/hooks/features/use-registrations";
import { useCallback } from "react";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUpdateMedicalStatus } from "@/hooks/features/use-update-medical-status";
import { DocViewerYuhu } from "./doc-viewer";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "lodash";
import { FormComponent } from "./form-component";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DoctorPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formId = searchParams.get("formId") || "";
  const { mutate, isPending } = useUpdateMedicalStatus();
  const { data } = useRegistrations();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="space-y-4">
      <Select
        onValueChange={(val) => {
          router.push(pathname + "?" + createQueryString("formId", val));
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select student" />
        </SelectTrigger>
        <SelectContent>
          {data?.data.map((item, idx) => (
            <SelectItem value={item.userId} key={idx}>
              {item.namaIjazah}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formId !== "" && data && (
        <>
          <FormComponent
            item={data.data.find((item) => item.userId === formId)!}
          />
          <Card>
            <CardHeader>
              <CardTitle>Surat Dokter</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge>
                {capitalize(
                  data.data.find((item) => item.userId === formId)!
                    .doctorApproval
                )}
              </Badge>
              <DocViewerYuhu
                uri={
                  data!.data.find((item) => item.userId === formId)!
                    .UploadedDocuments.suratDokter.uri
                }
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
                onClick={() => mutate({ status: "REJECT" })}
              >
                Reject
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};
