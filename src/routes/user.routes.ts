import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { userRegisterSchema } from "../utils/validationSchema";

const router = Router();

router.post("/register", validate(userRegisterSchema), registerUser);

export default router;
