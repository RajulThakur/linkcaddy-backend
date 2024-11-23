import { Request, Response } from "express";
import { UserInterface } from "../interface/interfaces";
import UserModel from "../schema/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleSignin = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user: UserInterface | null = await UserModel.findOne(
      { userName },
      "hashPassword",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username",
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
    );
    res
      .status(200)
      .cookie("token", token)
      .json({
        success: true,
        message: "Logged in successfully",
        id: user._id,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleSignup = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { firstName, lastName, userName, password } = req.body;
    if (!firstName || !lastName || !userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = await UserModel.create({
      firstName,
      lastName,
      userName,
      hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "User successfully created",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        userName: newUser.userName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLogout = async (
  req: Request,
  res: Response,
): Promise<any> => {
  res.cookie("token", "", {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
