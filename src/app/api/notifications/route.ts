import { fetchMongoDBUser } from "@/fetchData/fetchMongoDBUser";
import { WatchlistMovieType } from "@/app/lib/baseTypes";
import dbConnect from "@/app/lib/mongoose";
import Movie from "@/models/Movie";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs";
import { mongo } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  const notifications = [];
  const resend = new Resend(process.env.RESEND_API_KEY);

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

      if (foundMovie && !movie.sent_email) {
        console.log("sending email");
        // TODO replace with own email service
        // resend.emails.send({
        //   from: "onboarding@resend.dev",
        //   to: "christian.graumann@gmail.com",
        //   subject: `${foundMovie.title} is playing in a theater near you!`,
        //   html: `<p>Hello ${
        //     mongoUser.first_name || "moviemindr user"
        //   }</p><p>Your tracked movie ${
        //     foundMovie.title
        //   } is playing in a theater near you. Log in to find out where can watch it on the big screen again!</p><p>Best,<br />moviemindr team</p>`,
        // });
        movie.sent_email = true;
      }
      await mongoUser.save();
    }
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  return NextResponse.json({ success: true, data: notifications });
}
