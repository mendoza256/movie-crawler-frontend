"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserContextType, useUserContext } from "@/context/user-context";
import useFetchData from "@/hooks/fetchData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetchData(
    `http://localhost:3000/api/movies/`
  );
  const { user, handleFetchSession } = useUserContext() as UserContextType;
  const numberOfSkeletons = 10;
  const currentPages = Array.from({ length: 3 }).map((_, i) => page + i);
  const movies = data as any[];

  useEffect(() => {
    // handleFetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePreviousPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
  }

  console.log(data);

  return (
    <div>
      <section className="container mx-auto py-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Movies showing in Berlin</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-8">
            {user?.username
              ? `Welcome, ${user?.username}`
              : "Welcome, login to see which movies are showing in Berlin!"}
          </h2>
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </section>
      <section className="container mx-auto py-4">
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
                <a href={movie.movieUrl}>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                </a>
                <a href={movie.cinemaUrl}>
                  <span className="font-light">
                    Showing at {movie.cinemaName}
                  </span>
                </a>
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
                    className={`${i === page ? "font-black" : "font-normal"}`}
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
      </section>
    </div>
  );
};

export default Home;
