import usersRouter from "./usersRoutes.js";
import authRouter from "./authRoutes.js";
import conversationsRouter from "./conversationsRoutes.js";
import { Router } from "express";

const router = Router();

// Mount all routers
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/conversations", conversationsRouter);

export default router;
