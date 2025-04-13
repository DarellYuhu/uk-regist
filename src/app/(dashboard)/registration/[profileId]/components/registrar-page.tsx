"use client";

import { FormComponent } from "../../components/form-component";
import { DocumentTab } from "../../components/document-tab";
import { useStudentProfile } from "@/hooks/features/use-student-profile";

export const RegistrarPage = () => {
  const { data } = useStudentProfile();
  return (
    <div className="space-y-4">
      {data && (
        <>
          <FormComponent item={data.data} />
          <DocumentTab item={data.data.UploadedDocuments} />
        </>
      )}
    </div>
  );
};
