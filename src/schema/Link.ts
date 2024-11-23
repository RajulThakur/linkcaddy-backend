import { model, Schema } from "mongoose";
import { LinkInterface } from "../interface/interfaces";

const Link = new Schema<LinkInterface>({
  hash: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
});

export default model<LinkInterface>("Link", Link);
