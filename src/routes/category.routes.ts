import { Router } from "express";
import {
  getCategories,
  getCategoryProducts,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:slug/products", getCategoryProducts);

export default router;
