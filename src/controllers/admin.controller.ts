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

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(404).json({
        success: false,
        message: "Invalid status value",
      });
      return;
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.role === "admin") {
      res.status(403).json({
        success: false,
        message: "cannot update admin status",
      });
      return;
    }

    user.status = status;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
