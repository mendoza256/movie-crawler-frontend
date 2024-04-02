import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
  title: string;
  original_title?: string;
  release_date?: number;
  genre?: string;
  overview?: string;
  poster_path?: string;
  genre_ids?: number[];
  id?: number;
  popularity?: number;
  vote_average?: number;
}

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  original_title: { type: String },
  release_date: { type: Number },
  genre: { type: String },
  overview: { type: String },
  poster_path: { type: String },
  genre_ids: { type: [Number] },
  id: { type: Number },
  popularity: { type: Number },
  vote_average: { type: Number },
});

export default mongoose.models.Movie ||
  mongoose.model<IMovie>("Movie", MovieSchema);
