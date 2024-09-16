import Watchlist from "./watchlist";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const WatchlistPage = () => {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  if (!session) {
    redirect("/login");
  }

  // TODO get right mongodb user id from session
  const userId = session ? session.value : null;

  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="grid gap-8 lg:grid-cols-4 auto-rows-auto">
          <Watchlist userId={userId} />
        </div>
      </div>
    </section>
  );
};

export default WatchlistPage;
