import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z
    .string()
    .refine((val) => val.length >= 11, {
      message: "Phone number can not be exceed 11 characters long",
    })
    .optional(),
  address: z
    .string()
    .max(200, "Address can not exceed 200 characters")
    .optional(),
  role: z.string().optional(),
  image: z.string().optional(),
  storeInfo: z
    .object({
      name: z.string().min(5, "Store name is required"),
      description: z.string().optional(),
      logo: z.string().optional(),
    })
    .optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
