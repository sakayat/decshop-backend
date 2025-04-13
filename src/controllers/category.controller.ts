import { Request, Response } from "express";
import Category from "../models/Category";
import Product from "../models/Product";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getCategoryProducts = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    const products = await Product.find({ category: category._id });

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
