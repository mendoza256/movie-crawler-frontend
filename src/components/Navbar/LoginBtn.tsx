import Link from "next/link";
import Image from "next/image";
import UserIcon from "../../../public/icons/person-circle-outline.svg";
import { cookies } from "next/headers";

const LoginBtn = () => {
  // get session from session cookie
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  return (
    <div className="dropdown dropdown-end">
      <Link
        href={session ? "/profile" : "/signup"}
        className="btn btn-ghost btn-circle"
      >
        <Image
          src={UserIcon}
          height={40}
          width={40}
          alt="Notification Bell"
          className="invert-90"
        />
      </Link>
    </div>
  );
};

export default LoginBtn;
