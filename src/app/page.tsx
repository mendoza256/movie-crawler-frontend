// pages/index.js
import React, { useState, useEffect } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/crawl");
        const data = await response.json();
        console.log(data); // Handle the response data and update state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies in Berlin Cinemas</h1>
      {/* Display movie information */}
    </div>
  );
};

export default Home;
