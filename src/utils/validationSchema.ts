import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  discountPrice: z.number().optional(),
  discountExpiresAt: z.date().optional(),
  category: z.string().min(1, "Category ID is required"),
  videoUrl: z.string().optional(),
  stock: z.number().min(1, "Stock is required"),
});

export const productUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  discountExpiresAt: z.date().optional(),
  category: z.string().optional(),
  videoUrl: z.string().optional(),
  stock: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const orderCreateSchema = z.object({
  items: z.array(orderItemSchema).min(1, "At least one item is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  paymentMethod: z.string().optional(),
});

export const categorySchema = z.object({
  name: z
    .string({ required_error: "Category name is require" })
    .min(1, "Category name is require"),
});
