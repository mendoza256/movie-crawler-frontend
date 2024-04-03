import mongoose from "mongoose";

export interface IMovie extends mongoose.Document {
  _id: string;
  __v: number;
  cinemaName: string;
  cinemaUrl: string;
  created_at: string;
  dateText: string;
  movieUrl: string;
  title: string;
}

const MovieSchema = new mongoose.Schema({
  cinemaName: { type: String, required: true },
  cinemaUrl: { type: String, required: true },
  created_at: { type: String, required: true },
  dateText: { type: String, required: true },
  movieUrl: { type: String, required: true },
  title: { type: String, required: true },
});

export default mongoose.models.Movie ||
  mongoose.model<IMovie>("Movie", MovieSchema);
