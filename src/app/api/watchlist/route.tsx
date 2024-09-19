import clientPromise from "@/app/lib/mongodb";
import dbConnect from "@/app/lib/mongoose";
import Movie from "@/models/Movie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.error();
  }

  await dbConnect();

  try {
    const movie = await Movie.findById(movieId);
    return NextResponse.json({ success: true, data: movie });
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request, res: NextResponse) {
  // TODO - Add movie to watchlist
  const body = await req.json();
  const { movieId } = body;
  // const currentUser = req.user;

  if (!movieId) {
    return NextResponse.error();
  }

  try {
    const client = await clientPromise;
    const db = client.db("movie-crawler");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
  }
}
