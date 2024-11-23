import { model, Schema } from "mongoose";
import { TagInterface } from "../interface/interfaces";

const Tags = new Schema<TagInterface>({
  title: { type: String, required: true, unique: true },
});
export default model<TagInterface>("Tags", Tags);
