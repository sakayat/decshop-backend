import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  image: string;
  phone?: string;
  address?: string;
  storeInfo?: {
    name?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountExpiresAt?: Date;
  category: Types.ObjectId;
  images: string[];
  videoUrl?: string;
  seller: Types.ObjectId;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder {
  user: Types.ObjectId;
  seller: Types.ObjectId;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  itemsPrice: number;
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  isApprovedBySeller: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
