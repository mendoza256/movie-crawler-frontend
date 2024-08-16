import { cookies } from "next/headers";
import { getUserId } from "../lib/session";

const ProfilePage = () => {
  const userId = getUserId();

  console.log("userId", userId);

  return <div>Enter</div>;
};

export default ProfilePage;
