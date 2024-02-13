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
          <Link href={"/"}>Home</Link>
          <Link href={"/login"}>Login</Link>
          {/* <NavigationMenuTrigger></NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
