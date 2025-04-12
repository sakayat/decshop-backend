import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      discountExpiresAt,
      category,
      videoUrl,
      stock,
    } = req.body;

    const files = req.files as any[];
    const images = files?.map((file) => file.filename);

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      discountExpiresAt,
      category,
      images,
      videoUrl,
      stock,
      seller: req.user?._id,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
