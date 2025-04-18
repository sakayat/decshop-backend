import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
  getCategoryProducts,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:slug/products", getCategoryProducts);
router.get("/:slug/", getCategoryBySlug);

export default router;
