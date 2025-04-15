import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../types/interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (user.status !== "active") {
      res.status(401).json({
        success: false,
        message: `Your account has been ${user.status}.`,
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("token", "none", {
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image,
    };

    if (user.role === "seller" && user.storeInfo) {
      Object.assign(userData, { storeInfo: user.storeInfo });
    }

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, password, storeInfo } = req.body;

    const userId = req.user?._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (firstName) {
      user.lastName = lastName;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      user.image = req.file.filename;
    }

    if (user.role === "seller" && storeInfo) {
      user.storeInfo = {
        name: storeInfo.name,
      };
    }

    if (user.role === "seller" && storeInfo) {
      const existStore = await User.findOne({
        "storeInfo.name": req.body.storeInfo?.name,
      });

      if (existStore) {
        res.status(400).json({
          success: false,
          message: "store name already exists. please choose a different name",
        });
        return;
      }
    }

    const updateUser = await user.save();

    const userData = {
      _id: updateUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email,
      role: updateUser.role,
      image: updateUser.image,
    };

    if (updateUser.role === "seller" && updateUser.storeInfo) {
      Object.assign(userData, { storeInfo: updateUser.storeInfo });
    }

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
