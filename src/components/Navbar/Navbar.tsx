import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
// import VideoCamIcon from "../../../public/videocam-outline.svg";
import { currentUser } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  console.log(user);

  return (
    <NavigationMenu className="w-full fixed top-0 border-b-2 border-b-slate-50 bg-background p-2">
      <NavigationMenuList className="flex justify-between gap-4">
        <NavigationMenuItem className="flex-1 flex items-center">
          <Link href={"/"} className="">
            {/* <VideoCamIcon /> */}
            HOME
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {email
            ? `Welcome, ${email}`
            : "Welcome, login to see which movies are showing in Berlin!"}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <UserButton />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
