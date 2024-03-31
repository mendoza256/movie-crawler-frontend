import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <NavigationMenu className="w-full fixed top-0 border-b-2 border-b-slate-50 bg-background p-2">
      <NavigationMenuList className="flex gap-4">
        <NavigationMenuItem className="flex items-center">
          <Link href={"/"} className="">
            {/* <VideoCamIcon /> */}
            HOME
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex-1  flex items-center mr-auto">
          <Link href="/watchlist" className="">
            Watchlist
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex items-center ml-auto">
          <span>Welcome, login to see which movies are showing in Berlin!</span>
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
