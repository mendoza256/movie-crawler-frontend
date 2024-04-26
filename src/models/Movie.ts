import { TMDBMovieType } from "@/app/lib/baseTypes";
import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
  title: string;
  cinemaName?: string;
  cinemaUrl?: string;
  dateText?: string;
  movieUrl?: string;
  tmdbData?: TMDBMovieType;
  id?: number;
}

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cinemaName: { type: String },
  cinemaUrl: { type: String },
  dateText: { type: String },
  movieUrl: { type: String },
  tmdbData: { type: Object },
  id: { type: Number },
});

export default mongoose.models.Movie ||
  mongoose.model<IMovie>("Movie", MovieSchema);
