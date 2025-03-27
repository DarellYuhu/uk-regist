import { auth } from "@/lib/auth";
import { StudentPage } from "./components/student-page";
import { DoctorPage } from "./components/doctor-page";
import { RegistrarPage } from "./components/registrar-page";

export default async function RegistrationPage() {
  const session = await auth();
  if (!session?.user) return null;

  switch (session.user.role) {
    case "STUDENT":
      return <StudentPage />;
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
