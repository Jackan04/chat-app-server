import { Router } from "express";
import {
  getUsers,
  getUserById,
  toggleUserStatus,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/:id", updateUser);
usersRouter.patch("/:id/status", toggleUserStatus);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
