import { model, Schema } from "mongoose";
import { UserInterface } from "../interface/interfaces";

const User = new Schema<UserInterface>({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, require: true, unique: true },
  hashPassword: { type: String, require: true },
});

export default model<UserInterface>("User", User);
