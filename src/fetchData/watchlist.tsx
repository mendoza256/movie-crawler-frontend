export async function addToWatchlist(movieId: number) {
  const res = await fetch("/api/user/watchlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
    cache: "no-cache",
  });
  return res.json();
}

export async function removeFromWatchlist(movieId: number) {
  const res = await fetch("/api/user/watchlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
    cache: "no-cache",
  });
  return res.json();
}
