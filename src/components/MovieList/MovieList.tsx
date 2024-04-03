"use client";

import useFetchData from "@/hooks/fetchData";
import { useSearchParams } from "next/navigation";
import Loading from "./Skeleton";
import MovieItem from "./MovieItem";
import PaginationComponent from "./PaginationComponent";
import { MovieType } from "@/lib/baseTypes";

const MovieList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, loading, error } = useFetchData(
    `${process.env.FRONTEND_BASE_URL}/api/movies`,
    page
  );

  const movies = data as MovieType[];

  return (
    <div>
      {error && <span className="text-red-600">{error}</span>}
      {loading && <Loading />}
      {movies && movies?.map((movie, i) => <MovieItem key={i} movie={movie} />)}
      <PaginationComponent data={data} page={page} />
    </div>
  );
};

export default MovieList;
