import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT!;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
