import mongoose from "mongoose";
import { IProduct } from "../types/interface";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    discountExpiresAt: {
      type: Date,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: {
      type: [String],
    },
    videoUrl: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
