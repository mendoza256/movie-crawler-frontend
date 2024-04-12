import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (typeof req.url === "undefined") {
    return NextResponse.error();
  }

  const searchParams = new URL(req.url).searchParams;
  const movieTitle = searchParams.get("query") || "";

  if (typeof movieTitle !== "undefined" && movieTitle?.length > 0) {
    try {
      const url = process.env.TMDB_BASE_URL + movieTitle;
      const response = await fetch(url);
      const data = await response.json();
      return NextResponse.json({ success: true, data });
    } catch (e) {
      console.error(e);
    }
  } else {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  // TODO - Add movie to watchlist
  const movie = req.body;
  // const currentUser = req.user;

  if (!movie) {
    return NextResponse.error();
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
  }
}
