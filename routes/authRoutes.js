import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { register, login, getMe } from "../controllers/authController.js";
import {
  registerValidations,
  loginValidations,
} from "../middleware/validations.js";

const authRouter = Router();

authRouter.post("/register", registerValidations, register);
authRouter.post("/login", loginValidations, login);
authRouter.get("/me", authenticate, getMe);

export default authRouter;
