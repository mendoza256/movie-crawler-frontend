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
  function handleLogout() {
    fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  }

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
          <Link className="mx-2" href={"#"} onClick={handleLogout}>
            Logout
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
