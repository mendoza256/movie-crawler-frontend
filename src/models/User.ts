import mongoose from "mongoose";

export interface UserProps extends mongoose.Document {
  id: string;
  watchlist?: number[];
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
  watchlist: { type: [Number] },
});

export default mongoose.models.User ||
  mongoose.model<UserProps>("User", UserSchema);
