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

    if (!user || !user?.id || movieTitle === "") {
      return NextResponse.json({ success: false });
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: user.id },
      { $push: { watchlist: movieTitle } },
      { new: true }
    );
    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
