import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware";
import { getAllUsers } from "../controllers/admin.controller";

const router = Router();

router.get("/users", protect, authorize("admin"), getAllUsers);

export default router;
