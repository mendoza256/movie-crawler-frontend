import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  id: string;
  watchlist?: string[];
}

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  first_name: { type: String },
  last_name: { type: String },
  primary_email_address_id: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  watchlist: { type: [String] },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
