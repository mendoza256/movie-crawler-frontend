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
import { UserContextType, useUserContext } from "@/context/user-context";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { user, handleLogout } = useUserContext() as UserContextType;

  return (
    <NavigationMenu className="section mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem className="flex">
          <Link href={"/"} className="mx-2">
            Home
          </Link>
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
