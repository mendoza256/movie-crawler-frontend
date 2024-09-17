import Watchlist from "./watchlist";
import { getUser } from "../actions/auth";

const WatchlistPage = async () => {
  const user = await getUser();

  if (!user) {
    // Handle the case where the user is not found
    // This shouldn't happen if your route protection is working correctly
    return <div>User not found</div>;
  }

  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
        <div className="grid gap-8 lg:grid-cols-4 auto-rows-auto">
          <Watchlist userId={user.id} />
        </div>
      </div>
    </section>
  );
};

export default WatchlistPage;
