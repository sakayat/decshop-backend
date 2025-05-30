import mongoose, { mongo } from "mongoose";
import { IOrder } from "../types/interface";

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        images: [{ type: String }],
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
      default: "cash on delivery",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    isApprovedBySeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
