import { Request, Response } from "express";
import Product from "../models/Product";
import Order from "../models/Order";
import mongoose from "mongoose";
import Category from "../models/Category";

export const createProduct = async (req: Request, res: Response) => {
  // try {

  // } catch (error) {
  //   res.status(500).json({ message: "server error" });
  // }

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
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
      return;
    }

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

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }

    if (discountPrice) {
      product.discountPrice = discountPrice;
    }

    if (discountExpiresAt) {
      product.discountExpiresAt = discountExpiresAt;
    }

    if (category) {
      product.category = category;
    }

    if (videoUrl) {
      product.videoUrl = videoUrl;
    }
    if (stock) {
      product.stock = stock;
    }

    const updatedProduct = await product.save();

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "product not found",
      });
      return;
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "product delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getSellerProducts = async (req: Request, res: Response) => {
  try {
    const sellerId = req.user!._id;
    const total = await Product.countDocuments({ seller: sellerId });
    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      total,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const approveOrder = async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
      return;
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
      return;
    }

    if (order.seller.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
      return;
    }

    order.isApprovedBySeller = true;

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        message: "Invalid status",
      });
      return;
    }

    const order = await Order.findOne({
      _id: req.params.id,
      seller: req.user?._id,
    });

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order not found or not authorized",
      });
      return;
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const image = req.file?.filename;

    const exists = await Category.findOne({ name });

    if (exists) {
      res.status(400).json({
        success: false,
        message: "category name already exists",
      });
      return;
    }

    const category = await Category.create({
      name,
      image,
      seller: req.user?._id,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    if (category.name) {
      category.name = name;
    }

    if (req.file) {
      category.image = req.file.filename;
    }

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getSellerCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ seller: req.user?._id });

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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      seller: req.user?._id,
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug });

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
};

export const updatedProductImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      seller: req.user?._id,
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    if (product.seller.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this product",
      });
      return;
    }

    const files = req.files as any[];
    const newImages = files.map((file) => file.filename);

    if (product.images.length + files.length > 4) {
       res.status(400).json({
        success: false,
        message: "Cannot upload more than 4 images per product",
      });
      return
    }

    product.images = [...product.images, ...newImages];

    await product.save();

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const deleteProductImage = async (req: Request, res: Response) => {
  try {
    const { id, imageIndex } = req.params;

    const index = parseInt(imageIndex, 10);

    const product = await Product.findOne({
      _id: id,
      seller: req.user?._id,
    });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    if (product.images.length <= 1) {
      res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
      return;
    }

    if (product.seller.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this product",
      });
      return;
    }

    product.images.splice(index, 1);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
