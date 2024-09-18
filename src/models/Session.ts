import mongoose, { Document, Model, Schema } from "mongoose";

export interface SessionProps extends Document {
  userId: number;
  expiresAt: Date;
  iat?: number;
  exp?: number;
  createdAt: Date;
  sessionToken: string;
}

const SessionSchema: Schema = new Schema({
  userId: { type: Number, required: false },
  expiresAt: { type: Date, required: false },
  createdAt: { type: Date, required: false },
  sessionToken: { type: String, required: false },
  iat: { type: Number, required: false },
  exp: { type: Number, required: false },
});

const Session: Model<SessionProps> =
  mongoose.models.Session ||
  mongoose.model<SessionProps>("Session", SessionSchema);

export default Session;
