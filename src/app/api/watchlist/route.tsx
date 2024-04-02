import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.url === "undefined") {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  const searchParams = new URL(req.url).searchParams;
  const movieTitle = searchParams.get("query") || "";

  if (typeof movieTitle !== "undefined" && movieTitle?.length > 0) {
    try {
      const url = process.env.TMDB_BASE_URL + movieTitle;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(400).json({ error: "Missing movie name parameter" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const movie = req.body;
  // const currentUser = req.user;

  if (!movie) {
    res.status(400).json({ error: "Missing movie data" });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    res.status(200).json(movies);
  } catch (e) {
    console.error(e);
  }
}
