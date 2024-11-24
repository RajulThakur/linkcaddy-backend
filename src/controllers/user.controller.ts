import AuthRequest from '../interface/AuthRequest';
import { Response } from 'express';
export const handleGetUser = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  return res.status(200).json({ message: 'User', userId: req.userId });
};
