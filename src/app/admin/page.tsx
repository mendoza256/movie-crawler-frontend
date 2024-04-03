"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import { MovieType } from "@/lib/baseTypes";

const Admin = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const numberOfSkeletons = 15;
  // const isSuperadmin = user?.role === "superadmin";

  // useEffect(() => {
  //   handleFetchSession();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (!isSuperadmin) {
  //     redirect("/login");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  function handleClick() {
    setLoading(true);
    fetch(process.env.FRONTEND_BASE_URL + "/crawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.movieTitles);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error);
        setLoading(false);
      });
  }

  return (
    <div>
      <section className="container mx-auto py-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Movies showing in Berlin</h1>
          <Button className="mr-4" onClick={handleClick}>
            Superadmin: Crawl cinema websites
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-8">
            {/* {user?.username
              ? `Welcome, ${user?.username}`
              : "Welcome, login to see which movies are showing in Berlin!"} */}
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
        {data?.map((movie: MovieType, i: number) => (
          <div key={i} className="mb-4 flex items-center">
            <Avatar className="">
              <AvatarFallback>{movie.cinemaName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <span className="font-light">Showing at {movie.cinemaName}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
