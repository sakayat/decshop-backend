import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userLoginSchema, userRegisterSchema } from "../utils/validationSchema";
import { protect } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/register", validate(userRegisterSchema), registerUser);
router.post("/login", validate(userLoginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile)
router.put("/update-profile", protect, upload.single("image"), updateUser)


export default router;
