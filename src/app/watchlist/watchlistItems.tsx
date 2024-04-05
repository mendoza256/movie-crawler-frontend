interface IWatchlistItems {
  watchlist: string[];
  loading: boolean;
}

const WatchlistItems = ({ watchlist, loading }: IWatchlistItems) => {
  return (
    <>
      {!loading && (
        <ul className="flex flex-col gap-4 my-4">
          {watchlist?.map((movie, index) => (
            <li
              key={index}
              className="card card-compact w-full bg-base-100 shadow-xl items-center"
            >
              <div className="card-body prose text-center">
                <h4>{movie}</h4>
              </div>
            </li>
          )) || <p>No movies in watchlist</p>}
        </ul>
      )}
      {loading && (
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default WatchlistItems;
