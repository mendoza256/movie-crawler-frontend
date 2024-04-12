import User from "@/models/User";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import Movie from "@/models/Movie";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { movie } = body;
    const user = await currentUser();

    if (!user || !user?.id || movie === undefined) {
      return NextResponse.json({ success: false });
    }

    const movieIsInDatabase = await Movie.findOne({ id: movie.id });
    if (!movieIsInDatabase) {
      await Movie.create(movie);
    }

    const movieIsOnWatchlist = await User.findOne({
      id: user.id,
      watchlist: movie.id,
    });
    if (movieIsOnWatchlist) {
      return NextResponse.json({ success: false });
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: user.id },
      { $push: { watchlist: movie.id } },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
