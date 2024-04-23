import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US&page=1`
    );
    const movieData = await data.json();
    return NextResponse.json({ success: true, data: movieData });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
