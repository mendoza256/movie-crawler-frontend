import { useAuth } from "@clerk/nextjs";
import { fetchMongoDBUser } from "@/hooks/fetchMongoDBUser";
import { useEffect, useState } from "react";
import { IUser } from "@/models/User";

const WatchlistList = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<IUser>();
  async function getUser(userId: string) {
    const { user, isLoading, isError } = await fetchMongoDBUser(userId);
    if (isLoading) {
      console.log("Loading...");
    }
    if (isError) {
      console.log("Error...");
    }
    setUser(user);
  }

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return (
    <div className="flex flex-col gap-4">
      {user?.watchlist
        ? user.watchlist.map((movie, i) => (
            <div key={i} className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{movie}</h2>
              </div>
            </div>
          ))
        : "No movies in watchlist"}
    </div>
  );
};

export default WatchlistList;
