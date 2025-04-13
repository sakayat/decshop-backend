import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware";
import { getAllUsers, updateUserStatus } from "../controllers/admin.controller";

const router = Router();

router.get("/users", protect, authorize("admin"), getAllUsers);
router.post("/user/:id/update-status", protect, authorize("admin"), updateUserStatus);

export default router;
