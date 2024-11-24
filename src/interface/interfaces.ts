import { ObjectId } from 'mongoose';

export interface UserInterface {
  _id?: string | ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  hashPassword: string;
}
export interface LinkInterface {
  _id?: string | ObjectId;
  hash: string;
  userId: string;
}

export interface TagInterface {
  _id?: string | ObjectId;
  title: string;
}

export interface ContentInterface {
  _id?: string | ObjectId;
  link: string;
  type: string;
  contentType: ContentType;
  content: string;
  title: string;
  tags: string[];
  userId: string;
  createdAt?: Date;
}
export type ContentType = 'text' | 'image' | 'list';
