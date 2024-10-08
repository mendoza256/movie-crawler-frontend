import Link from "next/link";
import Notifications from "./Notifications";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-30 shadow-md">
      <nav className="navbar px-8 py-4 container gap-6">
        <div className="">
          <Link className="btn text-xl" href="/">
            Home
          </Link>
        </div>
        <div className="">
          <Link className="text-lg" href="/movies">
            Track Movies
          </Link>
        </div>
        <div className="flex-1">
          <Link className="text-lg" href="/watchlist">
            Watchlist
          </Link>
        </div>
        <div className="flex-none gap-4">
          {/* // TODO add search in Navbar */}
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div> */}

          <Notifications />
          <LoginBtn />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
