import  { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId,
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
    logo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct  {
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