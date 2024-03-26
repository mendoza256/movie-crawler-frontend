import React from "react";
import MovieList from "@/components/MovieList/MovieList";

const Home = () => {
  return (
    <div>
      <section className="container mx-auto py-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Movies showing in Berlin</h1>
        </div>
      </section>
      <section className="container mx-auto py-4">
        <MovieList />
      </section>
    </div>
  );
};

export default Home;
