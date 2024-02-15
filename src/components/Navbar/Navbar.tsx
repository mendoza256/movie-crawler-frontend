import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <NavigationMenu className="section mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={"/"} className="mx-2">
            Home
          </Link>
          <Link className="mx-2" href={"/login"}>
            Login
          </Link>
          <Link className="mx-2" href={"/signup"}>
            Sign up
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
