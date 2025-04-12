import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(409).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.status !== "active") {
      res.status(403).json({
        success: false,
        message: `Your account is ${user.status}. Please contact support.`,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `${req.user?.role} is not authorized to access this route`,
      });
      return;
    }
    next();
  };
};
