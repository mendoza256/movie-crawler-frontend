import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { WatchlistMovieType } from "@/lib/baseTypes";
import Movie from "@/models/Movie";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  const notifications = [];

  if (!user || !user.id) {
    return NextResponse.json({ success: false });
  }

  try {
    const mongoUser = await fetchMongoDBUser(user.id);
    const watchlist = mongoUser.user.watchlist as WatchlistMovieType[];
    for (const movie of watchlist) {
      const foundMovie = await Movie.findOne({ id: movie.id });

      if (foundMovie) {
        notifications.push({
          title: "Movie found in cinema!",
          message: `${foundMovie.title} is playing in a theater near you.`,
          movieLink: foundMovie.movieUrl,
          cinemaLink: foundMovie.cinemaUrl,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  return NextResponse.json({ success: true, data: notifications });
}
