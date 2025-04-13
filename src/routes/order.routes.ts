import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";
import { validate } from "../middlewares/validate";
import { orderCreateSchema } from "../utils/validationSchema";

const router = Router();

router.post("/", protect, validate(orderCreateSchema), createOrder);

export default router;
