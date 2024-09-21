import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const queryWithoutSpaces = keyword?.replace(/\s/g, "+");

  if (process.env.TMDB_API_KEY_AUTH === undefined) {
    return NextResponse.json({ success: false });
  }

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY_AUTH}&language=en-US&page=1&query=` +
        queryWithoutSpaces
    );
    const movieData = await data.json();
    return NextResponse.json({ success: true, data: movieData });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
