"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegistrations } from "@/hooks/features/use-registrations";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FromComponent } from "./form-component";

export const RegistrarPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formId = searchParams.get("formId") || "";
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
        <FromComponent
          item={data.data.find((item) => item.userId === formId)!}
        />
      )}
    </div>
  );
};
