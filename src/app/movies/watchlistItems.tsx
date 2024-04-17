interface WatchlistItemsProps {
  watchlist: string[];
  loading: boolean;
}

const WatchlistItems = ({ watchlist, loading }: WatchlistItemsProps) => {
  const skeletonAmount = 10;
  return (
    <ul className="flex flex-col gap-4 my-4">
      <>
        {!loading &&
          (watchlist?.map((movie, index) => (
            <li
              key={index}
              className="card card-compact w-full bg-base-100 shadow-xl items-center"
            >
              <div className="card-body prose text-center">
                <h4>{movie}</h4>
              </div>
            </li>
          )) || <p>No movies in watchlist</p>)}
        {loading &&
          Array.from({ length: skeletonAmount }).map((_, index) => (
            <div key={index} className="skeleton w-full h-14"></div>
          ))}
      </>
    </ul>
  );
};

export default WatchlistItems;
