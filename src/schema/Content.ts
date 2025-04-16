import { model, Schema } from 'mongoose';
import { ContentInterface } from '../interface/interfaces';
import UserModel from './User';

const IdeaTypes: string[] = ['links', 'videos', 'tweets', 'documents'];
const ContentTypes: string[] = ['text', 'image', 'list', 'empty'];

const Content = new Schema<ContentInterface>({
  link: { type: String, required: true },
  type: { type: String, required: true, enum: IdeaTypes },
  title: { type: String, required: true },
  contentType: { type: String, enum: ContentTypes },
  content: { type: String },
  tags: [{ type: String, ref: 'Tags' }],
  userId: {
    type: String,
    required: true,
    ref: 'User',
    validate: async (id: string): Promise<void | Error> => {
      const user = await UserModel.findById(id);
      if (!user) throw new Error("User Don't Exists");
    },
  },
  createdAt: { type: Date, default: Date.now },
});
export default model<ContentInterface>('Content', Content);
