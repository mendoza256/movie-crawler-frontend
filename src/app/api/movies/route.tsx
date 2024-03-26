/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.url === "undefined") {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  const searchParams = new URL(req.url).searchParams;
  const page = searchParams.get("page");

  if (typeof page !== "undefined" && !isNaN(Number(page))) {
    try {
      const client = await clientPromise;
      const db = client.db("movie-crawler");
      const movies = await db
        .collection("movies")
        .find({})
        .skip((Number(page) - 1) * 10)
        .limit(12)
        .toArray();
      return Response.json(movies);
    } catch (e) {
      console.error(e);
    }
  } else {
    res.status(400).json({ error: "Missing page parameter" });
  }
}
