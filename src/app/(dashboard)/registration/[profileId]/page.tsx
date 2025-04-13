import { auth } from "@/lib/auth";
import { DoctorPage } from "./components/doctor-page";
import { RegistrarPage } from "./components/registrar-page";

export default async function ProfileIdPage() {
  const session = await auth();
  if (!session?.user) return null;

  switch (session.user.role) {
    case "DOCTOR":
      return <DoctorPage />;
    case "REGISTRAR":
      return <RegistrarPage />;

    default:
      return (
        <div>
          <h1>Unauthorized</h1>
        </div>
      );
  }
}
