"use client";

import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/crawl");
        const data = await response.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Movies showing at Berlin Yorck Kinos</h1>
      {data?.movieTitles?.map((movie, i) => (
        <div key={i}>
          <h2>{movie}</h2>
        </div>
      ))}
    </div>
  );
};

export default Home;
