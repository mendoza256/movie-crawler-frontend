"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar/Navbar";

const Home = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const numberOfSkeletons = 15;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/crawl");
      const data = await response.json();
      setData(data.movieTitles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  function handleClick() {
    fetchData();
  }

  function handleFetchSession() {
    try {
      fetch("http://localhost:3001/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  }

  console.log(user);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto py-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Movies showing in Berlin</h1>
          <Button className="mr-4" onClick={handleClick}>
            Crawl cinema websites
          </Button>
          <Button className="" onClick={handleFetchSession}>
            Fetch session
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-8">
            {user?.username
              ? `Welcome, ${user?.username}`
              : "Welcome, login to see which movies are showing in Berlin!"}
          </h2>
        </div>
      </section>
      <section className="container mx-auto py-4">
        {loading &&
          Array.from({ length: numberOfSkeletons }).map((_, i) => (
            <div key={i} className="mb-4 flex items-center">
              <Skeleton key={i} className="w-[50px] h-[50px] rounded-full" />
              <div className="ml-4">
                <Skeleton
                  key={i}
                  className="w-[300px] h-[20px] mb-3 rounded-full"
                />
                <Skeleton key={i} className="w-[150px] h-[20px] rounded-full" />
              </div>
            </div>
          ))}
        {data?.map((movie, i) => (
          <div key={i} className="mb-4 flex items-center">
            <Avatar className="">
              <AvatarFallback>{movie.cinema.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <span className="font-light">Showing at {movie.cinema}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
