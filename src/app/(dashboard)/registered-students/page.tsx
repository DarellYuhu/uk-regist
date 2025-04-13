"use client";

import { Datatable } from "@/components/datatable";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsRegistered } from "@/hooks/features/use-is-registered";
import { Data } from "@/hooks/features/use-registrations";
import { Status } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { capitalize } from "lodash";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RegisteredStudentPage() {
  const nextSearchparams = useSearchParams();
  const searchParams = new URLSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(nextSearchparams.get("search") || "");
  const { data } = useIsRegistered();
  const id = useId();

  const handleSubmit = () => {
    if (search) {
      searchParams.set("search", search);
      router.push(`?${searchParams.toString()}`);
    } else {
      searchParams.delete("search");
      router.push(`?${searchParams.toString()}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
          onClick={handleSubmit}
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
      <Datatable columns={columns} data={data?.data || []} />
    </div>
  );
}

const columns: ColumnDef<Data["data"][0]>[] = [
  {
    id: "no",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "namaIjazah",
    header: "Nama Ijazah",
  },
  {
    accessorKey: "asalSekolah",
    header: "Asal Sekolah",
  },
  {
    accessorKey: "noTelp",
    header: "No. Telp",
  },
  {
    accessorKey: "doctorApproval",
    header: "Status Medis",
    cell({ row }) {
      return <StatusBadge status={row.original.doctorApproval} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status Pendaftaran",
    cell({ row }) {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pendaftaran",
    cell: ({ row }) => format(row.original.createdAt, "dd MMMM yyyy"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        // <Link
        //   href={`/registration/${row.original.id}`}
        //   className={buttonVariants({ variant: "outline", size: "sm" })}
        // >
        //   <Eye /> Detail
        // </Link>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Open
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Student detail</DialogTitle>
              <div className="space-y-2">
                <Badge>{capitalize(row.original.status)}</Badge>
                <table className="w-full">
                  <tbody>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">NIM</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">
                        {row.original.nomorIndukMahasiswa ?? "-"}
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Nama ijazah</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.namaIjazah}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Jenis kelamin</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.jenisKelamin}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Email</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.email}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">No Telp.</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.noTelp}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Propinsi Domisili</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">
                        {row.original.propinsiDomisili}
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Asal Sekolah</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.asalSekolah}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Program Studi</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.programStudi}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Tempat Lahir</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">{row.original.tempatLahir}</td>
                    </tr>
                    <tr className="align-middle">
                      <td className="w-1/4 font-medium">Tanggal Lahir</td>
                      <td className="w-4 text-xs p-2">:</td>
                      <td className="w-full">
                        {format(row.original.tanggalLahir, "dd MMMM yyyy")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

const StatusBadge = ({ status }: { status: Status }) => {
  switch (status) {
    case "WAITING":
      return (
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full bg-amber-500"
            aria-hidden="true"
          ></span>
          {capitalize(status)}
        </Badge>
      );
    case "APPROVE":
      return (
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          ></span>
          {capitalize(status)}
        </Badge>
      );
    case "REJECT":
      return (
        <Badge variant="outline" className="gap-1.5">
          <span
            className="size-1.5 rounded-full bg-red-500"
            aria-hidden="true"
          ></span>
          {capitalize(status)}
        </Badge>
      );

    default:
      return null;
  }
};
