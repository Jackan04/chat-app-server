import usersRouter from "./usersRoutes.js";
import authRouter from "./authRoutes.js";
import conversationsRouter from "./conversationsRoutes.js";
import { authenticate } from "../middleware/authenticate.js";
import { Router } from "express";

const router = Router();

// Mount all routers
router.use("/auth", authRouter);
router.use("/users", authenticate, usersRouter);
router.use("/conversations", authenticate, conversationsRouter);

export default router;
