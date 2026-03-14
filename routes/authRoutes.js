import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { register, login, getMe } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getMe);

export default authRouter;
