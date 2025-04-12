import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userLoginSchema, userRegisterSchema } from "../utils/validationSchema";

const router = Router();

router.post("/register", validate(userRegisterSchema), registerUser);
router.post("/login", validate(userLoginSchema), loginUser);

export default router;
