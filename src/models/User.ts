import { ObjectId as MongooseObjectId } from "mongodb";
import mongoose, { ObjectId } from "mongoose";

export interface UserProps extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  watchlist: ObjectId[];
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    watchlist: { type: [MongooseObjectId], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<UserProps>("User", UserSchema);
