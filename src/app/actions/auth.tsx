import { SignupFormSchema, FormState } from "@/lib/definitions";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (formData.get("password") !== formData.get("repeatPassword")) {
    return {
      errors: {
        repeatPassword: ["Passwords do not match"],
      },
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // If the form is valid, create a new user
  dbConnect();
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    watchlist: [],
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
