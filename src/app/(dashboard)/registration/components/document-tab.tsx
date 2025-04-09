import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocViewerYuhu } from "./doc-viewer";
import { Data as RegistrationData } from "@/hooks/features/use-registrations";

export const DocumentTab = ({
  item,
}: {
  item: RegistrationData["data"]["0"]["UploadedDocuments"];
}) => {
  return (
    <Tabs defaultValue="surat-dokter">
      <TabsList className="grid w-full grid-cols-5">
        {documentList.map((item, idx) => (
          <TabsTrigger value={item.value} key={idx}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {documentList.map((list, idx) => (
        <TabsContent value={list.value} key={idx}>
          <Card>
            <CardHeader>
              <CardTitle>{list.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {item[list.key as keyof typeof item] && (
                <DocViewerYuhu uri={item[list.key as keyof typeof item]!.uri} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const documentList = [
  {
    value: "surat-dokter",
    label: "Surat Dokter",
    key: "suratDokter",
  },
  {
    value: "ijazah",
    label: "Ijazah",
    key: "ijazah",
  },
  {
    value: "kartu-keluarga",
    label: "Kartu Keluarga",
    key: "kartuKeluarga",
  },
  {
    value: "akta-kelahiran",
    label: "Akta Kelahiran",
    key: "aktaKelahiran",
  },
  {
    value: "surat-baptis",
    label: "Surat Baptis",
    key: "suratBaptis",
  },
];
