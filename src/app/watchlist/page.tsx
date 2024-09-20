import Watchlist from "./watchlist";
import { getUser } from "../actions/auth";
import { UserProps } from "@/models/User";

const WatchlistPage = async () => {
  // TODO - get watchlist ids, then movies from db
  const user: UserProps = await getUser();
  const watchlistIds = user.watchlist;
  console.log("watchlistIds", watchlistIds);

  const watchlistMovies =
    (watchlistIds &&
      (await Promise.all(
        watchlistIds.map(async (id) => {
          const response = await fetch(`/api/watchlist?movieId=${id}`);

          const data = await response.json();
          return data.data;
        })
      ))) ||
    null;

  console.log("watchlistMovies", watchlistMovies);

  console.log(user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="grid gap-8 lg:grid-cols-4 auto-rows-auto">
          <Watchlist watchlistMovies={watchlistMovies} />
        </div>
      </div>
    </section>
  );
};

export default WatchlistPage;
