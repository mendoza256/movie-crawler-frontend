import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { movieTitle } = body;
    const user = await currentUser();
    console.log("req.body", body);
    console.log("user.id", user?.id);

    if (!user || !user?.id || movieTitle === "") {
      return NextResponse.json({ success: false });
    }

    const filter = { id: user.id };
    const update = movieTitle ? { watchlist: movieTitle } : {};
    const updatedUser = await User.findOneAndUpdate(filter, update);
    console.log("updatedUser", updatedUser);
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
  // update current user's watchlist with movieTitle

  await dbConnect();

  return NextResponse.json({ success: true, data: user });
}
