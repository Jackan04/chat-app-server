import { Router } from "express";
import { updateValidations } from "../middleware/validations.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/:id", updateValidations, updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
