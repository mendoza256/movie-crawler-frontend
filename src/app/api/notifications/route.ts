import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { WatchlistMovieType } from "@/lib/baseTypes";
import dbConnect from "@/lib/mongoose";
import Movie from "@/models/Movie";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  const notifications = [];

  if (!user || !user.id) {
    return NextResponse.json({ success: false });
  }

  dbConnect();

  try {
    const mongoUser = await User.findOne({ id: user.id });
    const watchlist = mongoUser.watchlist as WatchlistMovieType[];
    for (const movie of watchlist) {
      const foundMovie = await Movie.findOne({
        id: movie.id,
        cinemaName: { $ne: null },
      });

      if (foundMovie) {
        notifications.push({
          title: "Movie found in cinema!",
          message: `<b>${foundMovie.title}</b> is playing in a theater near you.`,
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
