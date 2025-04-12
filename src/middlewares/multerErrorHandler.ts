import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const multerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (
      err.code === "LIMIT_FILE_COUNT" ||
      err.code === "LIMIT_UNEXPECTED_FILE"
    ) {
      res.status(400).json({
        success: false,
        message: "You can not upload more than 4 images",
      });
      return;
    }
  }
  next(err);
};
