import { Router } from "express";
import {
  approveOrder,
  createProduct,
  deleteProduct,
  getSellerProducts,
  updateOrderStatus,
  updateProduct,
} from "../controllers/seller.controller";
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

router.delete("/delete-product/:id", protect, deleteProduct);

router.get("/products", getSellerProducts);
router.post("/order/:id/approve", approveOrder);

router.put("/order/:id/status", updateOrderStatus);

export default router;
