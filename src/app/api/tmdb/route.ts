import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (process.env.TMDB_API_KEY_AUTH === undefined) {
    return NextResponse.json({ success: false });
  }

  console.log(
    "full: ",
    "https://api.themoviedb.org/3/search/movie?api_key=bdd53a5a1b27d31391a233a8e60cbacf&language=en-US&page=1&query=" +
      query
  );

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US&page=1&query=` +
        query
    );
    const movieData = await data.json();
    return NextResponse.json({ success: true, data: movieData });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
