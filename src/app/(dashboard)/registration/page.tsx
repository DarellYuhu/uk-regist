import { auth } from "@/lib/auth";
import { StudentPage } from "./components/student-page";
import { StudentList } from "./components/student-list";

export default async function RegistrationPage() {
  const session = await auth();
  if (!session?.user) return null;

  switch (session.user.role) {
    case "STUDENT":
      return <StudentPage />;
    case "DOCTOR":
    case "REGISTRAR":
      return <StudentList />;

    default:
      return (
        <div>
          <h1>Unauthorized</h1>
        </div>
      );
  }
}
