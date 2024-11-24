import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthRequest from '../interface/AuthRequest';

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;
  console.log('middleware token', token);
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    (req as AuthRequest).userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
