import React from "react";
import MovieList from "@/components/MovieList/MovieList";

const Home = () => {
  return (
    <section className="mt-10">
      <div className="container flex gap-8 flex-col">
        <h1 className="text-2xl font-bold mb-4">
          What&apos;s coming up in Berlin theaters
        </h1>
        <MovieList />
      </div>
    </section>
  );
};

export default Home;
