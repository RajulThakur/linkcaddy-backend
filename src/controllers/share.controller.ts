import Link from "../schema/Link";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import Content from "../schema/Content";
import User from "../schema/User";

export const handleShareContent = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const hash = await bcrypt.hash(decoded.userId, 9);
    await Link.create({ userId: decoded.userId, hash });

    res.status(200).json({
      success: true,
      link: `share?shareid=${hash}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const handleGetSharedContent = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const shareid = req.query.shareid as string;

    if (!shareid) {
      return res.status(400).json({
        status: false,
        message: "Share ID is required",
      });
    }

    // Find the link document to get userId
    const linkDoc = await Link.findOne({ hash: shareid });

    if (!linkDoc) {
      return res.status(404).json({
        status: false,
        message: "Share link not found",
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
      message: "Successfully retrieved shared content",
      content: {
        sharedContent,
        sharedBy: `${user?.firstName} ${user?.lastName}`,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};
