import mongoose from "mongoose";

export interface UserProps extends mongoose.Document {
  id: string;
  watchlist?: { id: number[]; date_added: Date; title: string }[];
}

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  watchlist: { type: Array },
});

export default mongoose.models.User ||
  mongoose.model<UserProps>("User", UserSchema);
