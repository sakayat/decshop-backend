import { Router } from "express";
import {
  approveOrder,
  createCategory,
  createProduct,
  deleteProduct,
  getSellerProducts,
  updateOrderStatus,
  updateProduct,
} from "../controllers/seller.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import {
  categorySchema,
  productSchema,
  productUpdateSchema,
} from "../utils/validationSchema";
import { upload } from "../middlewares/upload";
import { multerErrorHandler } from "../middlewares/multerErrorHandler";

const router = Router();

router.use(protect, authorize("seller"));

router.post(
  "/create-product",
  upload.array("images", 4),
  validate(productSchema),
  createProduct
);

router.put(
  "/update-product/:id",
  upload.array("images", 4),
  multerErrorHandler,
  validate(productUpdateSchema),
  updateProduct
);

router.delete("/delete-product/:id", deleteProduct);
router.get("/products", getSellerProducts);
router.post("/order/:id/approve", approveOrder);
router.put("/order/:id/status", updateOrderStatus);
router.post(
  "/create-category",
  validate(categorySchema),
  upload.single("image"),
  createCategory
);

export default router;
