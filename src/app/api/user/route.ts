/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.body?.data;
  const watchlist = [] as string[];
  const newUser = { id, watchlist };

  try {
    const user = await User.create(
      newUser
    ); /* create a new model in the database */
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const user = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    }); /* update a model in the database */
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
