import { z } from "zod";

export const userSchema = {
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  password: z.string().min(5).max(32),
  repeatPassword: z.string().min(5).max(32),
};
