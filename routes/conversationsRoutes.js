import { Router } from "express";
import {
  getConversations,
  createConversation,
  getConversationById,
  sendMessage,
} from "../controllers/conversationsController.js";
import { messageValidations } from "../middleware/validations.js";

const conversationsRouter = Router();

conversationsRouter.get("/", getConversations);
conversationsRouter.post("/", createConversation);
conversationsRouter.get("/:id", getConversationById);
conversationsRouter.post("/:id/messages", messageValidations, sendMessage);

export default conversationsRouter;
