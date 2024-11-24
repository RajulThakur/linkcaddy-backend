import { Response } from 'express';
import AuthRequest from '../interface/AuthRequest';
import Content from '../schema/Content';
import { generateContent } from './helperContent';
export const handleAddContent = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { link, title, type, tags } = req.body;

  try {
    const contentData = await generateContent(link, title, type, tags);
    //Adding content to database
    const data = await Content.create({ ...contentData, userId: req.userId });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'Invalid arguments',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const handleGetContent = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const data = await Content.find({ userId: req.userId });

    res.status(200).json({
      success: true,
      message: 'Content retrieved successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const handleDeleteContent = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const { postId } = req.body;

    // Check if the post belongs to the user
    const post = await Content.findOne({ _id: postId, userId: req.userId });
    if (!post) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this content',
      });
    }

    await Content.findByIdAndDelete(postId);
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
