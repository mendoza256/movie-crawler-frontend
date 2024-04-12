/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "@/lib/mongoose";
import Movie from "@/models/Movie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  if (typeof req.url === "undefined") {
    return NextResponse.json({ error: "Invalid request" });
  }

  await dbConnect();

  const searchParams = new URL(req.url, "http://localhost").searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10; // default limit to 10 documents per page

  const skip = (page - 1) * limit;

  try {
    const movies = await Movie.find().skip(skip).limit(limit);
    const total = await Movie.countDocuments();

    return NextResponse.json({
      data: movies,
      meta: {
        totalDocuments: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error fetching data" });
  }
}
