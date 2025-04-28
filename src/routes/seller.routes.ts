import { Router } from "express";
import {
  approveOrder,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getProductBySlug,
  getSellerCategories,
  getSellerProducts,
  getUserOrders,
  updateCategory,
  updatedProductImages,
  updateOrderStatus,
  updateProduct,
} from "../controllers/seller.controller";
import { authorize, protect } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload";
import { multerErrorHandler } from "../middlewares/multerErrorHandler";
import { validate } from "../middlewares/validate";
import { productSchema } from "../utils/validationSchema";

const router = Router();

router.use(protect, authorize("seller"));

router.post(
  "/create-product",
  upload.array("images", 4),
  validate(productSchema),
  multerErrorHandler,
  createProduct
);

router.put(
  "/update-product/:slug",
  upload.array("images", 4),
  multerErrorHandler,
  updateProduct
);

router.post(
  "/product/:id/images",
  upload.array("images", 4),
  multerErrorHandler,
  updatedProductImages
);

router.delete("/delete-product/:id", deleteProduct);

router.delete("/product/:id/images/:imageIndex", deleteProductImage);

router.get("/products", getSellerProducts);
router.get("/product/:slug", getProductBySlug);
router.post("/order/:id/approve", approveOrder);
router.put("/order/:id/status", updateOrderStatus);
router.get("/user-orders", getUserOrders);
router.post("/create-category", upload.single("image"), createCategory);
router.put("/update-category/:slug", upload.single("image"), updateCategory);
router.get("/categories", getSellerCategories);
router.delete("/delete-category/:id", deleteCategory);

export default router;
