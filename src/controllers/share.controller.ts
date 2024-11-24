import Link from '../schema/Link';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Content from '../schema/Content';
import User from '../schema/User';
import AuthRequest from '../interface/AuthRequest';

export const handleShareContent = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  try {
    const hash =  bcrypt.hashSync(req.userId as string, 3);
    console.log('hash', hash);
    const link = await Link.create({ userId: req.userId, hash });
    console.log('link', link);
    res.status(200).json({
      success: true,
      link: `share?shareid=${hash}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const handleGetSharedContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const shareid = req.query.shareid as string;

    if (!shareid) {
      return res.status(400).json({
        status: false,
        message: 'Share ID is required',
      });
    }

    // Find the link document to get userId
    const linkDoc = await Link.findOne({ hash: shareid });

    if (!linkDoc) {
      return res.status(404).json({
        status: false,
        message: 'Share link not found',
      });
    }

    // Get only the content for this user
    const sharedContent = await Content.find({ userId: linkDoc.userId });

    const user = await User.findById(linkDoc.userId, {
      firstName: 1,
      lastName: 1,
    });

    res.status(200).json({
      status: true,
      message: 'Successfully retrieved shared content',
      content: {
        sharedContent,
        sharedBy: `${user?.firstName} ${user?.lastName}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Something went wrong',
    });
  }
};
