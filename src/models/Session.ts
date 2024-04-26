import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
