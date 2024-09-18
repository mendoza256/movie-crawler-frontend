import Watchlist from "./watchlist";
import { getUser } from "../actions/auth";

const WatchlistPage = async () => {
  const user = await getUser();
  const watchlist = user.watchlist;

  console.log(user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="grid gap-8 lg:grid-cols-4 auto-rows-auto">
          <Watchlist watchlist={watchlist} />
        </div>
      </div>
    </section>
  );
};

export default WatchlistPage;
