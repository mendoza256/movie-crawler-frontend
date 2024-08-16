import mongoose from "mongoose";

export interface UserProps extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  watchlist?: [];
  id: number;
}

const UserSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  watchlist: { type: Array },
  id: { type: Number },
});

export default mongoose.models.User ||
  mongoose.model<UserProps>("User", UserSchema);
