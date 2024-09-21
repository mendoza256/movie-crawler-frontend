import { TMDBMovieType } from "@/app/lib/baseTypes";
import { useEffect, useState } from "react";

async function fetchSearchResults(keyword: string) {
  const res = await fetch(`/api/tmdb?keyword=${keyword}`);
  if (!res.ok) {
    throw new Error(`Failed to look up movie: ${res.status}`);
  }
  const { success, data } = await res.json();
  if (success) {
    return data.results;
  }
}

export function useTmdbSearch() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<TMDBMovieType[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (keyword) {
      setIsSearchLoading(true);
      fetchSearchResults(keyword)
        .then((results) => setSearchResults(results))
        .catch((error) => setSearchError(error.message))
        .finally(() => setIsSearchLoading(false));
    }
  }, [keyword]);

  return { searchResults, isSearchLoading, searchError, setKeyword };
}
