/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await dbConnect();
  const { id, first_name, last_name, primary_email_address_id } = body.data;
  const watchlist = [] as string[];
  const newUser = {
    id,
    first_name,
    last_name,
    primary_email_address_id,
    watchlist,
  };

  try {
    const user = await User.create(newUser);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const body = await req.json();
  try {
    if (!body) {
      return NextResponse.json({ success: false });
    }

    const user = await User.findByIdAndUpdate(body.id, body, {
      new: true,
      runValidators: true,
    }); /* update a model in the database */
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const userId = req.nextUrl.searchParams.get("id");

  try {
    const user = await User.findOne({ id: userId });
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
