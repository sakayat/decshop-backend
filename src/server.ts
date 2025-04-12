import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import userRoutes from "./routes/user.routes"; 

dotenv.config();

const app: Express = express();
const port = process.env.PORT!;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
