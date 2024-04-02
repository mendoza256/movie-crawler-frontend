import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  role: string;
  watchlist?: string[];
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  watchlist: { type: [String] },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
