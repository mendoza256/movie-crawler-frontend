import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  if (!session) {
    redirect("/login");
  }

  return <div>Enter</div>;
};

export default ProfilePage;
