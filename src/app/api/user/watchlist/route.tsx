import User from "@/models/User";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import Movie from "@/models/Movie";
import dbConnect from "@/app/lib/mongoose";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { movie } = body;
    const user = await currentUser();

    if (!user || !user?.id || movie === undefined) {
      return NextResponse.json({ success: false });
    }

    await dbConnect();
    console.log("movie", movie.title);
    try {
      const foundMovie = await Movie.findOne({ id: movie.id });
      if (!foundMovie) {
        console.log("Movie not in DB");
        const newMovie = new Movie({
          tmdbData: movie,
          id: movie.id,
          title: movie.title,
        });
        console.log("Saving movie");
        await newMovie.save();
      } else {
        console.log("Movie already in DB");
      }
    } catch (error) {
      console.error("Error saving movie", error);
    }

    const newMovieItem = {
      id: movie.id,
      date_added: new Date(),
      title: movie.title,
      tmdbData: movie,
      sent_email: false,
    };

    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: user.id },
        { $push: { watchlist: newMovieItem } },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
      return NextResponse.json({ success: false, error });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    const { movieId } = body;
    const user = await currentUser();

    if (!user || !user?.id || movieId === undefined) {
      return NextResponse.json({ success: false });
    }

    await dbConnect();

    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: user.id },
        { $pull: { watchlist: { _id: movieId } } },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
      return NextResponse.json({ success: false, error });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
