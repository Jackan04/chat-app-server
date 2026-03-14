import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticate, getMe);

export default authRouter;
