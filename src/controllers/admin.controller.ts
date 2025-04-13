import { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");

    const filteredUsers = users.filter(
      (user) => user.role === "buyer" || user.role === "seller"
    );

    if (!filteredUsers) {
      res.status(404).json({
        success: false,
        message: "No users found with the role",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: filteredUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
