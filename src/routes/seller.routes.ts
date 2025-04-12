import { Router } from "express";
import { createProduct } from "../controllers/seller.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { productSchema } from "../utils/validationSchema";
import { upload } from "../middlewares/upload";

const router = Router();

router.use(protect, authorize("seller"))

router.post(
  "/create-product",
  protect,
  upload.array("images", 4),
  validate(productSchema),
  createProduct
);

export default router;
