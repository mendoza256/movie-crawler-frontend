/* eslint-disable import/no-anonymous-default-export */
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    const movies = await db.collection("movies").find({}).limit(10).toArray();
    console.log(movies);
    const data = movies;
    return Response.json(data);
  } catch (e) {
    console.error(e);
  }
}
