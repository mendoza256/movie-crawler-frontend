import mongoose, { Document, Model, Schema } from "mongoose";

export interface SessionProps extends Document {
  userId: number;
  expiresAt: Date;
}

const SessionSchema: Schema = new Schema({
  userId: { type: Number, required: false },
  expiresAt: { type: Date, required: false },
});

const Session: Model<SessionProps> =
  mongoose.models.Session ||
  mongoose.model<SessionProps>("Session", SessionSchema);

export default Session;
