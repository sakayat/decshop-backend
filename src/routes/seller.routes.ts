import { Router } from "express";
import { createProduct, updateProduct } from "../controllers/seller.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { productSchema, productUpdateSchema } from "../utils/validationSchema";
import { upload } from "../middlewares/upload";
import { multerErrorHandler } from "../middlewares/multerErrorHandler";

const router = Router();

router.use(protect, authorize("seller"));

router.post(
  "/create-product",
  protect,
  upload.array("images", 4),
  validate(productSchema),
  createProduct
);

router.put(
  "/update-product/:id",
  protect,
  upload.array("images", 4),
  multerErrorHandler,
  validate(productUpdateSchema),
  updateProduct
);

export default router;
