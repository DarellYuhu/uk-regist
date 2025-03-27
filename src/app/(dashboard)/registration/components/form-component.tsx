import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateProfileStatus } from "@/hooks/features/use-update-profile-status";
import { StudentProfile } from "@prisma/client";

export const FromComponent = ({ item }: { item: StudentProfile }) => {
  const { mutate, isPending } = useUpdateProfileStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Badge>{item.status}</Badge>
        <table className="w-full">
          <tbody>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Nama ijazah</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.namaIjazah}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Jenis kelamin</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.jenisKelamin}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Email</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.email}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">No Telp.</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.noTelp}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Propinsi Domisili</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.propinsiDomisili}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Asal Sekolah</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.asalSekolah}</td>
            </tr>
            <tr className="align-middle">
              <td className="w-1/4 font-medium">Program Studi</td>
              <td className="w-4 text-xs p-2">:</td>
              <td className="w-full">{item.programStudi}</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
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
  );
};
