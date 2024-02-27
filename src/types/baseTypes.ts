export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
  role: "user" | "superadmin";
};
