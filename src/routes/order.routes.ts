import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;
