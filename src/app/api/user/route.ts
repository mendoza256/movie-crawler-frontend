/* eslint-disable import/no-anonymous-default-export */
import User from "@/models/User";
import dbConnect from "@/app/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

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
