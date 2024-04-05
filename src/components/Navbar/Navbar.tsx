import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

// const Navbar = () => {
//   return (
//     <NavigationMenu className="w-full fixed top-0 border-b-2 border-b-slate-50 bg-background p-2">
//       <NavigationMenuList className="flex gap-4">
//         <NavigationMenuItem className="flex items-center">
//           <Link href={"/"} className="">
//             {/* <VideoCamIcon /> */}
//             HOME
//           </Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem className="flex-1  flex items-center mr-auto">
//           <Link href="/watchlist" className="">
//             Watchlist
//           </Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem className="flex items-center ml-auto">
//           <span>Welcome, login to see which movies are showing in Berlin!</span>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <UserButton />
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <ThemeToggle />
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };
// export default Navbar;

const Navbar = () => {
  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-10 shadow-md">
      <nav className="navbar px-8 py-4 container">
        <div className="flex-1">
          <Link className="btn text-xl" href="/">
            Home
          </Link>
        </div>
        <div className="flex-none gap-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="avatar w-10 rounded-full grid place-items-center">
                <UserButton
                  appearance={{
                    elements: {
                      rootBox: {
                        height: "100%",
                        width: "100%",
                      },
                      userButtonBox: {
                        height: "100%",
                        width: "100%",
                        padding: "0",
                      },
                      userButtonTrigger: {
                        height: "100%",
                        width: "100%",
                        padding: "0",
                      },
                      avatarBox: {
                        height: "100%",
                        width: "100%",
                      },
                      open: {
                        border: "none",
                        boxShadow: "none",
                        padding: "0",
                      },
                      userButtonPopoverCard: {
                        top: 72,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
