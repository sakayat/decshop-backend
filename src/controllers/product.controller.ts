import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).populate("category", "name slug");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const {slug} = req.params;

    const product = await Product.findOne({ slug }).populate("category", "name slug")

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
