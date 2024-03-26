"use client";

import React from "react";
import MovieList from "@/components/MovieList/MovieList";

const Home = () => {
  return (
    <div>
      <section className="container mx-auto py-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Movies showing in Berlin</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-8">
            {/* {user?.username
              ? `Welcome, ${user?.username}`
              : "Welcome, login to see which movies are showing in Berlin!"} */}
            Welcome user
          </h2>
        </div>
      </section>
      <section className="container mx-auto py-4">
        <MovieList />
      </section>
    </div>
  );
};

export default Home;
