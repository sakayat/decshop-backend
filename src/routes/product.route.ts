import { Router } from "express";
import { getProductDetails, getProducts } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/details/:slug", getProductDetails);

export default router;
