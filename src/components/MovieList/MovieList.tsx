"use client";

import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import useFetchData from "@/hooks/fetchData";
import { useSearchParams } from "next/navigation";

const MovieList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const { data, loading, error } = useFetchData(
    `http://localhost:3000/api/movies`,
    page
  );
  const numberOfSkeletons = 10;
  const currentPages = Array.from({ length: 3 }).map((_, i) => page + i + 1);
  const movies = data as any[];

  function handlePreviousPage() {
    if (Number(page) <= 1) return;
    window.location.href = `/?page=${Number(page) - 1}`;
  }

  function handleNextPage() {
    if (Number(page) >= 20) return;
    window.location.href = `/?page=${Number(page) + 1}`;
  }

  return (
    <div>
      {error && <span className="text-red-600">{error}</span>}
      {loading &&
        Array.from({ length: numberOfSkeletons }).map((_, i) => (
          <div key={i} className="mb-4 flex items-center">
            <Skeleton className="w-[50px] h-[50px] rounded-full" />
            <div className="ml-4">
              <Skeleton className="w-[300px] h-[20px] mb-3 rounded-full" />
              <Skeleton className="w-[150px] h-[20px] rounded-full" />
            </div>
          </div>
        ))}
      {movies &&
        movies?.map((movie, i) => (
          <div key={i} className="mb-4 flex items-center">
            <Avatar className="">
              <AvatarFallback>{movie.cinemaName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <Link href={movie.movieUrl} target="_blank">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
              </Link>
              <Link href={movie.cinemaUrl} target="_blank">
                <span className="font-light">
                  Showing at {movie.cinemaName}
                </span>
              </Link>
            </div>
          </div>
        ))}
      {data ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handlePreviousPage} />
            </PaginationItem>
            {currentPages.map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={`${
                    i === parseInt(page) ? "font-black" : "font-normal"
                  }`}
                  href="#"
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
};

export default MovieList;
