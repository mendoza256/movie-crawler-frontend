/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body;

  if (!user) {
    res.status(400).json({ error: "Missing user" });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    const users = await db.collection("users").insertOne(user);
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body;

  if (!user) {
    res.status(400).json({ error: "Missing user" });
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    const users = await db
      .collection("users")
      .updateOne({ _id: user._id }, { $set: user });
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
  }
}
