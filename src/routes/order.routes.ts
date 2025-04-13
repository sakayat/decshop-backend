import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createOrder, getMyOrders } from "../controllers/order.controller";
import { validate } from "../middlewares/validate";
import { orderCreateSchema } from "../utils/validationSchema";

const router = Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;
