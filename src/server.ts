import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/database";
import userRoutes from "./routes/user.routes";
import sellerRoutes from "./routes/seller.routes";
import orderRoutes from "./routes/order.routes";
import adminRoutes from "./routes/admin.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT as string;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
